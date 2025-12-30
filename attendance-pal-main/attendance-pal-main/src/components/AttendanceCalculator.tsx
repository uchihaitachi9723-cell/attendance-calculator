import { useState } from "react";
import { Calculator, RotateCcw, CheckCircle2, AlertTriangle, XCircle, BookOpen } from "lucide-react";

interface CalculationResult {
  currentPercentage: number;
  status: "success" | "warning" | "error";
  message: string;
  detail: string;
}

const AttendanceCalculator = () => {
  const [totalClasses, setTotalClasses] = useState<string>("");
  const [attendedClasses, setAttendedClasses] = useState<string>("");
  const [requiredPercentage, setRequiredPercentage] = useState<string>("75");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>("");

  const validateInputs = (): boolean => {
    const total = parseInt(totalClasses);
    const attended = parseInt(attendedClasses);
    const required = parseFloat(requiredPercentage);

    if (!totalClasses || !attendedClasses || !requiredPercentage) {
      setError("Please fill in all fields");
      return false;
    }

    if (isNaN(total) || isNaN(attended) || isNaN(required)) {
      setError("Please enter valid numbers");
      return false;
    }

    if (total <= 0 || attended < 0 || required <= 0) {
      setError("Values must be positive numbers");
      return false;
    }

    if (attended > total) {
      setError("Attended classes cannot exceed total classes");
      return false;
    }

    if (required > 100) {
      setError("Required percentage cannot exceed 100%");
      return false;
    }

    setError("");
    return true;
  };

  const calculateAttendance = () => {
    if (!validateInputs()) {
      setResult(null);
      return;
    }

    const total = parseInt(totalClasses);
    const attended = parseInt(attendedClasses);
    const required = parseFloat(requiredPercentage);

    const currentPercentage = (attended / total) * 100;

    if (currentPercentage >= required) {
      // Calculate how many classes can be skipped
      // Formula: (attended) / (total + x) >= required/100
      // attended >= (required/100) * (total + x)
      // attended - (required/100) * total >= (required/100) * x
      // x <= (attended - (required/100) * total) / (required/100)
      const canSkip = Math.floor(
        (attended - (required / 100) * total) / (required / 100)
      );

      setResult({
        currentPercentage: parseFloat(currentPercentage.toFixed(2)),
        status: "success",
        message: "You're on track!",
        detail:
          canSkip > 0
            ? `You can safely skip up to ${canSkip} more class${canSkip > 1 ? "es" : ""} and still maintain ${required}% attendance.`
            : `Your attendance is exactly at ${required}%. Don't skip any more classes!`,
      });
    } else {
      // Calculate how many more classes need to be attended
      // Formula: (attended + x) / (total + x) >= required/100
      // attended + x >= (required/100) * (total + x)
      // attended + x >= (required/100) * total + (required/100) * x
      // x - (required/100) * x >= (required/100) * total - attended
      // x * (1 - required/100) >= (required/100) * total - attended
      // x >= ((required/100) * total - attended) / (1 - required/100)
      const requiredFraction = required / 100;
      const needToAttend = Math.ceil(
        (requiredFraction * total - attended) / (1 - requiredFraction)
      );

      if (needToAttend < 0 || !isFinite(needToAttend)) {
        setResult({
          currentPercentage: parseFloat(currentPercentage.toFixed(2)),
          status: "error",
          message: "Target unreachable",
          detail: `It's mathematically impossible to reach ${required}% attendance with your current record.`,
        });
      } else {
        setResult({
          currentPercentage: parseFloat(currentPercentage.toFixed(2)),
          status: "warning",
          message: "Attendance needed!",
          detail: `You need to attend ${needToAttend} more consecutive class${needToAttend > 1 ? "es" : ""} to reach ${required}% attendance.`,
        });
      }
    }
  };

  const handleReset = () => {
    setTotalClasses("");
    setAttendedClasses("");
    setRequiredPercentage("75");
    setResult(null);
    setError("");
  };

  const getStatusIcon = () => {
    switch (result?.status) {
      case "success":
        return <CheckCircle2 className="w-6 h-6 text-success" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-warning" />;
      case "error":
        return <XCircle className="w-6 h-6 text-destructive" />;
      default:
        return null;
    }
  };

  const getResultClass = () => {
    switch (result?.status) {
      case "success":
        return "result-success";
      case "warning":
        return "result-warning";
      case "error":
        return "result-error";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="card-elevated p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Quick Calculator</h2>
            <p className="text-sm text-muted-foreground">Enter your attendance details</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5">
          {/* Total Classes */}
          <div className="space-y-2">
            <label htmlFor="totalClasses" className="block text-sm font-medium text-foreground">
              Total Classes Conducted
            </label>
            <input
              type="number"
              id="totalClasses"
              value={totalClasses}
              onChange={(e) => setTotalClasses(e.target.value)}
              placeholder="e.g., 50"
              min="1"
              className="input-field"
            />
          </div>

          {/* Attended Classes */}
          <div className="space-y-2">
            <label htmlFor="attendedClasses" className="block text-sm font-medium text-foreground">
              Classes Attended
            </label>
            <input
              type="number"
              id="attendedClasses"
              value={attendedClasses}
              onChange={(e) => setAttendedClasses(e.target.value)}
              placeholder="e.g., 40"
              min="0"
              className="input-field"
            />
          </div>

          {/* Required Percentage */}
          <div className="space-y-2">
            <label htmlFor="requiredPercentage" className="block text-sm font-medium text-foreground">
              Required Attendance (%)
            </label>
            <input
              type="number"
              id="requiredPercentage"
              value={requiredPercentage}
              onChange={(e) => setRequiredPercentage(e.target.value)}
              placeholder="e.g., 75"
              min="1"
              max="100"
              className="input-field"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm animate-fade-in">
              <XCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button onClick={calculateAttendance} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculate
            </button>
            <button onClick={handleReset} className="btn-secondary flex items-center justify-center gap-2" aria-label="Reset form">
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className={`result-card mt-6 ${getResultClass()}`}>
            <div className="flex items-start gap-3">
              {getStatusIcon()}
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold">{result.currentPercentage}%</span>
                  <span className="text-sm opacity-75">current attendance</span>
                </div>
                <p className="font-semibold mb-1">{result.message}</p>
                <p className="text-sm opacity-90">{result.detail}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCalculator;

import AttendanceCalculator from "@/components/AttendanceCalculator";
import { GraduationCap, Info } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:py-12">
      <main className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-8 sm:mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4">
            <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Attendance Calculator for College Students
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto">
            Quickly calculate your attendance percentage and find out how many classes you can skip or need to attend.
          </p>
        </header>

        {/* Calculator */}
        <section className="animate-slide-up" aria-label="Attendance Calculator">
          <AttendanceCalculator />
        </section>

        {/* Info Section */}
        <section className="mt-8 sm:mt-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="card-elevated p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
                <Info className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground mb-2">How it works</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-primary">1.</span>
                    Enter the total number of classes conducted so far
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-primary">2.</span>
                    Enter how many classes you've attended
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-primary">3.</span>
                    Set your required attendance percentage (default is 75%)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium text-primary">4.</span>
                    Click "Calculate" to see your current percentage and how many classes you can skip or need to attend
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-muted-foreground">
          <p>Made for students, by students. Stay on track with your attendance!</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;

/**
 * Sample Page
 */

import PageMeta from "../components/common/PageMeta";

export default function SamplePage() {
  return (
    <>
      <PageMeta title="Home" description="Home Page Introduction" />
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-mono text-center px-6">
        <div>
          <h3 className="text-3xl font-black text-white mb-4">[ SAMPLE_PAGE ]</h3>
          <p className="text-muted-foreground text-sm max-w-md leading-relaxed mx-auto">
            This is a placeholder sample page. The portfolio landing application is configured in App.tsx.
          </p>
        </div>
      </div>
    </>
  );
}

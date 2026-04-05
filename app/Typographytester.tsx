export default function TypographyTester() {
  return (
    <div className="bg-surface border border-border rounded-card p-8 w-full max-w-3xl mx-auto mt-10 shadow-card">
      
      {/* 1. Eyebrow Heading */}
      <h6>Typography Guidelines</h6>
      
      {/* 2. Main Title */}
      <h1>The quick brown fox jumps</h1>
      <p>
        This is an H1. Use this for the main page title (like &quot;Dashboard&quot; or &quot;Settings&quot;). 
        There should usually only be one H1 per page.
      </p>

      <hr className="border-border my-8" />

      {/* 3. Section Title */}
      <h2>Over the lazy dog</h2>
      <p>
        This is an H2. Use this for major sections of your page. Notice how the paragraph 
        automatically uses a highly readable line-height and the muted text color so it 
        doesn&apos;t compete with the heading.
      </p>

      <hr className="border-border my-8" />

      {/* 4. Card Title */}
      <h3>Widget Title</h3>
      <p>
        This is an H3. Perfect for the titles of individual cards, charts, or widgets on 
        your dashboard. When you need to emphasize something, use the <strong>strong tag</strong> 
        and it will automatically turn bold and switch to the bright text color!
      </p>

      <hr className="border-border my-8" />

      {/* 5. Sub-sections */}
      <h4>Form Section</h4>
      <p>
        This is an H4. Great for breaking up forms or smaller data blocks. 
      </p>
      
      <div className="mt-4 p-4 bg-background rounded-input border border-border">
        <h5>Input Label</h5>
        <p>This is an H5. Good for large labels or very compact component titles.</p>
        <small>And this is the small tag, perfect for form validation messages or tiny dates underneath a transaction.</small>
      </div>

    </div>
  );
}

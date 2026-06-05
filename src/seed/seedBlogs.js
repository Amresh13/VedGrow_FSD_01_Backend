import mongoose from 'mongoose';
import env from '../config/env.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';
import Blog from '../models/Blog.js';

const tags = [
  'javascript', 'react', 'nodejs', 'css', 'python',
  'typescript', 'nextjs', 'tailwind', 'mongodb', 'api',
];

const blogs = [
  {
    coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    title: 'Getting Started with React 19: What You Need to Know',
    excerpt: 'React 19 introduces exciting new features including server components, improved hooks, and better performance out of the box. Here is everything you should know to get started.',
    content: `<h2>Introduction</h2><p>React 19 is finally here, and it brings a lot of exciting changes. Whether you are building a new project or upgrading an existing one, there are several key features you should be aware of.</p><h2>Server Components</h2><p>One of the biggest additions is the stable release of React Server Components. This allows you to render components on the server, reducing the amount of JavaScript sent to the client.</p><blockquote><p>Server Components enable faster page loads and better SEO by rendering content on the server before sending it to the browser.</p></blockquote><h2>Improved Hooks</h2><p>The new <code>use()</code> hook allows you to read resources like promises and context directly within render. This simplifies data fetching patterns significantly.</p><ul><li><strong>use(Promise)</strong> - Suspends until the promise resolves</li><li><strong>use(Context)</strong> - Reads context value directly</li></ul><h2>Performance Improvements</h2><p>React 19 includes a rewritten reconciler that reduces memory usage and improves rendering performance. The new compiler, React Forget, automatically memoizes components and hooks, so you no longer need to manually add <code>useMemo</code> or <code>useCallback</code>.</p><p>Overall, React 19 is a solid release that makes development faster and applications more performant.</p>`,
    categorySlug: 'programming',
    tagNames: ['react', 'javascript', 'typescript'],
    status: 'published',
    views: 1240,
    daysAgo: 3,
  },
  {
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    title: 'Building Responsive Layouts with Tailwind CSS v4',
    excerpt: 'Tailwind CSS v4 introduces a new CSS-first configuration model and powerful new utilities for building responsive designs faster than ever.',
    content: `<h2>What is New in Tailwind v4</h2><p>Tailwind CSS v4 represents a major shift in how the framework works. Instead of a JavaScript configuration file, it now uses native CSS custom properties and the <code>@theme</code> directive.</p><h2>CSS-First Configuration</h2><p>You can now define your design tokens directly in CSS:</p><pre><code>@theme {\n  --color-primary: #3b82f6;\n  --color-secondary: #8b5cf6;\n  --font-heading: "Inter", sans-serif;\n}</code></pre><h2>New Utility Classes</h2><p>The new version adds utilities for container queries, complex grid layouts, and improved animation support.</p><ul><li><code>@container</code> - Container query support</li><li><code>grid-auto-rows</code> - Better control over grid rows</li><li><code>animate-*</code> - New animation utilities</li></ul><p>Upgrading from v3 is straightforward, and the performance improvements are immediately noticeable in both development and production builds.</p>`,
    categorySlug: 'web-development',
    tagNames: ['css', 'tailwind', 'react'],
    status: 'published',
    views: 890,
    daysAgo: 5,
  },
  {
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    title: 'Understanding JavaScript Closures in Practice',
    excerpt: 'Closures are one of the most powerful and misunderstood concepts in JavaScript. Learn how they work with practical, real-world examples.',
    content: `<h2>What is a Closure?</h2><p>A closure is a function that remembers the variables from its lexical scope even after the outer function has returned. This is a fundamental concept in JavaScript that powers many advanced patterns.</p><h2>Practical Examples</h2><p>Here is a simple counter example using closures:</p><pre><code>function createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2</code></pre><h2>Common Use Cases</h2><ul><li><strong>Data privacy</strong> - Encapsulating private variables</li><li><strong>Partial application</strong> - Pre-filling function arguments</li><li><strong>Memoization</strong> - Caching function results</li></ul><p>Understanding closures is essential for mastering JavaScript and frameworks like React that rely heavily on them.</p>`,
    categorySlug: 'programming',
    tagNames: ['javascript', 'nodejs'],
    status: 'published',
    views: 2100,
    daysAgo: 7,
  },
  {
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    title: 'The Complete Guide to MongoDB Aggregation Pipeline',
    excerpt: 'Master the MongoDB aggregation pipeline with this comprehensive guide covering stages, operators, and optimization techniques.',
    content: `<h2>Introduction to Aggregation</h2><p>The MongoDB aggregation pipeline is a powerful framework for data processing. Documents pass through a series of stages, each transforming the data in some way.</p><h2>Core Stages</h2><p>Here are the most commonly used stages:</p><ul><li><code>$match</code> - Filter documents</li><li><code>$group</code> - Group documents by a field</li><li><code>$sort</code> - Sort documents</li><li><code>$project</code> - Reshape documents</li><li><code>$lookup</code> - Join collections</li></ul><h2>Example Pipeline</h2><pre><code>db.orders.aggregate([\n  { $match: { status: "completed" } },\n  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },\n  { $sort: { total: -1 } },\n  { $limit: 10 }\n])</code></pre><p>With practice, the aggregation pipeline becomes an indispensable tool for any MongoDB developer.</p>`,
    categorySlug: 'technology',
    tagNames: ['mongodb', 'nodejs', 'api'],
    status: 'published',
    views: 1560,
    daysAgo: 10,
  },
  {
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    title: 'Designing Accessible User Interfaces: A Practical Guide',
    excerpt: 'Accessibility is not optional. Learn how to design and build interfaces that work for everyone, including people with disabilities.',
    content: `<h2>Why Accessibility Matters</h2><p>Over 1 billion people worldwide have some form of disability. Building accessible interfaces ensures your product can be used by everyone, while also improving SEO and user experience for all users.</p><h2>Key Principles</h2><ul><li><strong>Perceivable</strong> - Information must be presentable to users</li><li><strong>Operable</strong> - UI components must be usable</li><li><strong>Understandable</strong> - Information and UI must be clear</li><li><strong>Robust</strong> - Content must work with assistive technologies</li></ul><h2>Practical Tips</h2><p>Start with these actionable steps:</p><ul><li>Use semantic HTML elements</li><li>Ensure sufficient color contrast</li><li>Add proper ARIA labels where needed</li><li>Make all interactive elements keyboard accessible</li><li>Test with screen readers</li></ul><p>Accessibility is an ongoing process, not a one-time fix. Incorporate it into your design system from the start.</p>`,
    categorySlug: 'design',
    tagNames: ['css', 'react'],
    status: 'published',
    views: 780,
    daysAgo: 12,
  },
  {
    coverImage: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=400&fit=crop',
    title: 'Node.js Error Handling Best Practices',
    excerpt: 'Proper error handling can make or break a Node.js application. Learn the patterns and practices used by experienced developers.',
    content: `<h2>Types of Errors</h2><p>In Node.js, errors generally fall into three categories: operational errors, programmer errors, and system errors. Each requires a different approach.</p><h2>Using Express Middleware</h2><pre><code>app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(err.status || 500).json({\n    message: err.message || "Internal Server Error"\n  });\n});</code></pre><h2>Async Error Handling</h2><p>With async/await, you should wrap your route handlers to catch errors:</p><pre><code>const asyncHandler = (fn) => (req, res, next) =>\n  Promise.resolve(fn(req, res, next)).catch(next);</code></pre><h2>Best Practices Checklist</h2><ul><li>Use custom error classes</li><li>Log errors with context</li><li>Handle uncaught exceptions gracefully</li><li>Validate input at the boundary</li><li>Never expose stack traces in production</li></ul><p>Good error handling improves user experience and makes debugging much easier.</p>`,
    categorySlug: 'programming',
    tagNames: ['nodejs', 'javascript', 'api'],
    status: 'published',
    views: 1850,
    daysAgo: 14,
  },
  {
    coverImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop',
    title: 'A Beginners Guide to TypeScript Generics',
    excerpt: 'Generics can seem intimidating, but they are one of the most powerful features of TypeScript. This guide breaks them down with simple examples.',
    content: `<h2>What are Generics?</h2><p>Generics allow you to write reusable code that works with multiple types while maintaining type safety. Think of them as variables for types.</p><h2>Basic Example</h2><pre><code>function identity&lt;T&gt;(value: T): T {\n  return value;\n}\n\nconst num = identity(42);     // type: number\nconst str = identity("hello"); // type: string</code></pre><h2>Real-World Use Case</h2><pre><code>interface ApiResponse&lt;T&gt; {\n  data: T;\n  message: string;\n  status: number;\n}\n\nconst response: ApiResponse&lt;User&gt; = await fetchUser();</code></pre><h2>Key Benefits</h2><ul><li>Type safety without sacrificing flexibility</li><li>Better IDE support with autocomplete</li><li>Reduces code duplication</li></ul><p>Once you start using generics, you will find them indispensable for building scalable TypeScript applications.</p>`,
    categorySlug: 'programming',
    tagNames: ['typescript', 'javascript'],
    status: 'published',
    views: 1100,
    daysAgo: 17,
  },
  {
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    title: 'How to Build a REST API with Express and MongoDB',
    excerpt: 'Step-by-step tutorial on building a production-ready REST API using Express.js, MongoDB, and modern JavaScript.',
    content: `<h2>Project Setup</h2><p>Start by initializing your project and installing dependencies:</p><pre><code>npm init -y\nnpm install express mongoose dotenv cors helmet</code></pre><h2>Folder Structure</h2><p>Organize your code with a clean architecture:</p><pre><code>src/\n  config/    # Database, env\n  models/    # Mongoose models\n  routes/    # Express routes\n  controllers/ # Route handlers\n  middleware/ # Custom middleware</code></pre><h2>Basic Server Setup</h2><pre><code>import express from "express";\nconst app = express();\napp.use(express.json());\napp.listen(5000, () => console.log("Server running"));</code></pre><h2>Best Practices</h2><ul><li>Use environment variables for configuration</li><li>Implement proper validation</li><li>Add rate limiting and security headers</li><li>Structure your code with separation of concerns</li></ul><p>With these patterns, you can build APIs that are maintainable and scalable.</p>`,
    categorySlug: 'web-development',
    tagNames: ['nodejs', 'mongodb', 'api'],
    status: 'published',
    views: 3200,
    daysAgo: 20,
  },
  {
    coverImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt: 'Both CSS Grid and Flexbox are powerful layout tools. Learn when to reach for each one and how to combine them effectively.',
    content: `<h2>The Core Difference</h2><p>Flexbox is one-dimensional (row OR column), while Grid is two-dimensional (rows AND columns). This fundamental difference guides most decisions.</p><h2>Use Flexbox When</h2><ul><li>Laying out items in a single direction</li><li>Centering content within a container</li><li>Building navigation bars and toolbars</li><li>Distributing space between items</li></ul><h2>Use Grid When</h2><ul><li>Creating page-level layouts</li><li>Building card grids and galleries</li><li>Overlapping elements intentionally</li><li>Aligning items in both directions</li></ul><h2>Combining Both</h2><p>Modern layouts often use both together. Use Grid for the overall page structure and Flexbox for the components within each grid area.</p><p>Understanding both tools gives you the flexibility to build any layout with minimal code.</p>`,
    categorySlug: 'web-development',
    tagNames: ['css', 'tailwind'],
    status: 'published',
    views: 2450,
    daysAgo: 24,
  },
  {
    coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    title: 'Navigating Your First Year as a Software Developer',
    excerpt: 'Starting your career in software development can be overwhelming. Here is practical advice from experienced developers to help you thrive.',
    content: `<h2>Embrace the Learning Curve</h2><p>Your first year is about learning how to learn. No one expects you to know everything. Focus on building a strong foundation.</p><h2>Key Skills to Develop</h2><ul><li>Reading and understanding code</li><li>Asking good questions</li><li>Version control with Git</li><li>Writing tests</li><li>Debugging effectively</li></ul><h2>Tips for Success</h2><p>Here are some things experienced developers wish they had known earlier:</p><ul><li>Code review is your best learning tool</li><li>Document your work and decisions</li><li>Build side projects to reinforce learning</li><li>Network with other developers</li><li>Take care of your health and avoid burnout</li></ul><p>Remember that every expert was once a beginner. Be patient with yourself and celebrate small wins along the way.</p>`,
    categorySlug: 'career',
    tagNames: ['javascript', 'react'],
    status: 'published',
    views: 4300,
    daysAgo: 28,
  },
  {
    coverImage: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=400&fit=crop',
    title: 'Introduction to Next.js 15: Server Components and More',
    excerpt: 'Next.js 15 brings stable React Server Components, improved routing, and better performance. Learn what is new and how to use it.',
    content: `<h2>What is Next.js 15?</h2><p>Next.js 15 is the latest major version of the React framework for production. It builds on the App Router introduced in version 13 and adds significant improvements.</p><h2>Server Components by Default</h2><p>All components in the App Router are now server components by default. This means they render on the server and send only HTML to the client.</p><h2>New Features</h2><ul><li><strong>Stable Server Actions</strong> - Call server functions from client components</li><li><strong>Improved Caching</strong> - More predictable and configurable</li><li><strong>Partial Prerendering</strong> - Combine static and dynamic content</li></ul><h2>Getting Started</h2><pre><code>npx create-next-app@latest my-app\ncd my-app\nnpm run dev</code></pre><p>Next.js 15 makes it easier than ever to build fast, full-stack React applications.</p>`,
    categorySlug: 'technology',
    tagNames: ['nextjs', 'react', 'typescript'],
    status: 'published',
    views: 1680,
    daysAgo: 32,
  },
  {
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
    title: 'Python for Web Development: A Modern Introduction',
    excerpt: 'Python remains a top choice for web development thanks to frameworks like Django and FastAPI. Here is how to get started building web apps with Python.',
    content: `<h2>Why Python for Web?</h2><p>Python is known for its readability and extensive ecosystem. Frameworks like Django, Flask, and FastAPI make web development productive and enjoyable.</p><h2>Choosing a Framework</h2><ul><li><strong>Django</strong> - Batteries-included, great for large applications</li><li><strong>Flask</strong> - Lightweight and flexible</li><li><strong>FastAPI</strong> - Modern, async, with automatic OpenAPI docs</li></ul><h2>FastAPI Example</h2><pre><code>from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/")\nasync def root():\n    return {"message": "Hello World"}</code></pre><h2>Ecosystem Highlights</h2><p>Python web development benefits from a rich ecosystem of tools for databases, authentication, testing, and deployment.</p>`,
    categorySlug: 'programming',
    tagNames: ['python', 'api'],
    status: 'published',
    views: 920,
    daysAgo: 35,
  },
];

function randomDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  return date;
}

const seedBlogs = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected for seeding blogs...');

    const existingBlogs = await Blog.countDocuments();
    if (existingBlogs > 0) {
      console.log(`Deleting ${existingBlogs} existing blogs to re-seed...`);
      await Blog.deleteMany({});
    }

    const admin = await User.findOne();
    if (!admin) {
      console.error('No admin user found. Run seedAdmin first.');
      await mongoose.disconnect();
      process.exit(1);
    }

    const categories = await Category.find();
    if (categories.length === 0) {
      console.error('No categories found. Run seedCategories first.');
      await mongoose.disconnect();
      process.exit(1);
    }

    const categoryMap = {};
    for (const cat of categories) {
      categoryMap[cat.slug] = cat._id;
    }

    for (const tagName of tags) {
      const existing = await Tag.findOne({ name: tagName });
      if (!existing) {
        await Tag.create({ name: tagName });
      }
    }

    const allTags = await Tag.find();
    const tagMap = {};
    for (const tag of allTags) {
      tagMap[tag.name] = tag._id;
    }

    const blogDocs = blogs.map((b) => ({
      title: b.title,
      excerpt: b.excerpt,
      content: b.content,
      coverImage: b.coverImage,
      author: admin._id,
      category: categoryMap[b.categorySlug],
      tags: b.tagNames.map((t) => tagMap[t]).filter(Boolean),
      status: b.status,
      views: b.views,
      publishedAt: randomDate(b.daysAgo),
    }));

    await Blog.create(blogDocs);
    console.log(`Seeded ${blogDocs.length} blog posts.`);
    await mongoose.disconnect();
    console.log('Seed complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedBlogs();

import type { Post } from "@/lib/posts";

const post: Post = {
  slug: "church-website-checklist",
  title: "Church website checklist: 12 pages every ministry site needs in 2026",
  description:
    "The pages, sections, and details that actually matter for a modern church website — based on what visitors look for in the first 30 seconds.",
  date: "2026-05-10",
  readMinutes: 7,
  category: "Design Checklist",
  content: (
    <>
      <p>
        Most church websites fail the same way: they were built for the
        people who already attend, not the people deciding whether to visit
        on Sunday. A first-time visitor lands on your site and asks three
        questions in about 15 seconds — <em>where</em>, <em>when</em>, and{" "}
        <em>what should I expect</em>. If your homepage doesn't answer all
        three above the fold, you've lost them.
      </p>
      <p>
        Here's the page-by-page checklist we use when we build a ministry
        site at HLPR. Use it to audit your current site or scope a new one.
      </p>

      <h2>The 12 pages every church site needs</h2>

      <h3>1. Home</h3>
      <p>
        Service times, address, and a "Plan Your Visit" button visible
        before the user scrolls. One clear photo of <em>your actual
        people</em> — not stock images of a generic worship band.
      </p>

      <h3>2. Plan Your Visit</h3>
      <p>
        What to wear. Where to park. What happens to my kids. How long is
        the service. This page converts more visitors than any other —
        treat it like a landing page.
      </p>

      <h3>3. About / What We Believe</h3>
      <p>
        Two short paragraphs on your story plus your statement of faith.
        Don't bury this in a 2,000-word essay — most visitors scan.
      </p>

      <h3>4. Sermons / Messages</h3>
      <p>
        Embedded video or audio of recent messages. Searchable by series.
        This is the #2 most-visited page after the homepage.
      </p>

      <h3>5. Ministries / Get Involved</h3>
      <p>
        One card per ministry (kids, youth, small groups, worship,
        outreach). Each card links to a short detail page with a contact.
      </p>

      <h3>6. Events / Calendar</h3>
      <p>
        Upcoming events with date, time, location, and RSVP. If your
        calendar is empty, hide this page rather than show a stale 2024
        event.
      </p>

      <h3>7. Give</h3>
      <p>
        A dedicated giving page with one primary "Give Now" button. Keep
        the form on-page where possible; every redirect loses ~30% of
        givers.
      </p>

      <h3>8. Contact</h3>
      <p>
        Address, phone, email, embedded map, and a contact form that
        actually goes to a real human inbox (and gets answered within 48
        hours).
      </p>

      <h3>9. Staff / Leadership</h3>
      <p>
        Photos and short bios of pastors and elders. People want to know
        who's leading before they walk in.
      </p>

      <h3>10. Kids / Youth</h3>
      <p>
        Parents check this page before they ever set foot in your building.
        Photos of your space, your check-in process, and your safety
        policy.
      </p>

      <h3>11. Small Groups</h3>
      <p>
        A searchable or filterable directory of groups with location, day,
        and a contact for each leader. The #1 connection point for new
        attendees after Sunday service.
      </p>

      <h3>12. Prayer Request</h3>
      <p>
        A simple form. Optional anonymity. Goes to a designated prayer team
        — not a black hole.
      </p>

      <h2>The technical details that quietly matter</h2>
      <ul>
        <li>
          <strong>Mobile-first.</strong> Every page should look right on a
          5-inch phone before it ever looks right on a 27-inch monitor.
        </li>
        <li>
          <strong>Fast.</strong> Aim for under 2 seconds to first paint.
          Compress every image. Remove autoplay video.
        </li>
        <li>
          <strong>Accessible.</strong> Alt text on every image, real
          headings (not bold paragraphs), 4.5:1 contrast on body text.
        </li>
        <li>
          <strong>SEO basics.</strong> Unique title and description on
          every page. A sitemap submitted to Google. LocalBusiness or
          Church schema with your address.
        </li>
        <li>
          <strong>SSL certificate.</strong> If your URL still says "http://"
          and not "https://", Google is actively penalizing you.
        </li>
      </ul>

      <h2>What you can skip</h2>
      <ul>
        <li>
          A live chat widget. Nobody is staffing it on a Sunday.
        </li>
        <li>
          A blog you'll update twice and abandon. Better to not have one
          than to have one that says "Welcome to our new site! — March
          2022."
        </li>
        <li>
          An app. For 95% of churches, a great mobile site does
          everything an app does, costs nothing extra, and doesn't require
          downloads.
        </li>
      </ul>

      <h2>The 30-second test</h2>
      <p>
        Pull up your church website on your phone right now. Time how long
        it takes you to find:
      </p>
      <ol>
        <li>What time the service starts this Sunday.</li>
        <li>The street address.</li>
        <li>A button to plan your first visit.</li>
      </ol>
      <p>
        If any of those took more than 10 seconds, your site is costing you
        first-time visitors every week. Fixing those three is a one-day
        project — start there before anything else on this list.
      </p>
    </>
  ),
};

export default post;

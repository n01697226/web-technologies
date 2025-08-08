import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Local Loot</h1>
        <p>Find and share garage sales in your local community.</p>
      </section>

      <section className="about">
        <h2>Why I Made This App</h2>
        <p>
          One summer afternoon, I was driving through the neighborhood and
          noticed dozens of garage sale signs along the road. Some were for past
          events that had already ended, while others were missing important
          details like the address or start time. I realized that while people
          are excited to share their sales, it is easy to forget key information
          — and once all the signs are posted, updating them can be a real
          hassle.
        </p>
        <p>
          That is when the idea for Local Loot was born. This app guides you
          step-by-step through creating your sale listing, making sure you don't
          forget the essential details. It automatically removes your listing
          once your sale is over, so no one wastes time chasing outdated events.
          Plus, you can update your sale information anytime with just a few
          clicks.
        </p>
        <p>
          Local Loot makes it simple, accurate, and stress-free to share your
          sale with the community — and just as easy for buyers to find exactly
          what they are looking for.
        </p>
      </section>

      <section className="sales-preview">
        <h2>Upcoming Garage Sales</h2>
        <p>Sales will appear here once they are added!</p>
      </section>
    </div>
  );
}

export default Home;

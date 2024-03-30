import React from "react";
import PageLayout from "../../containers/PageLayout";
import css from "./home.module.scss";
import Button from "../../components/Home/Button";

const Home: React.FC = (): JSX.Element => {
  return (
    <PageLayout>
      <div className={css.parent}>
        <h1>Welcome to Pokémon Explorer!</h1>
        <p>
          Discover the vast world of Pokémon right at your fingertips. Whether
          you're a seasoned Trainer or just starting your journey, Pokémon
          Explorer is your gateway to a world filled with adventure.
        </p>
        <Button to="/pokemon-list" text="Explore Pokemon" />
        <div>
          <p>What We Offer:</p>
          <ul>
            <li>
              <span>Explore All Pokémon:</span> Dive into our extensive database
              to discover all your favorite Pokémon species. From Pikachu to
              Charizard, they're all here waiting to be found.
            </li>
            <li>
              <span>Search for Pokémon:</span> Looking for a specific Pokémon?
              Use our powerful search feature to find exactly what you're
              looking for in no time.
            </li>
          </ul>
        </div>
        <p>
          Ready to begin your Pokémon adventure? Click the button below to start
          exploring!
        </p>
        <Button to="/pokemon-list" text="Explore Pokemon" />
      </div>
    </PageLayout>
  );
};

export default Home;

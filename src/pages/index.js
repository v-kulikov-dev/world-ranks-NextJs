import Layout from "../components/Layout/Layout";
import SearchInput from "../components/SearchInput/SearchInput";
import styles from "../styles/Home.module.css";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import { useState } from "react";

export default function Home({ countries }) {
  const [keyboard, setKeyboard] = useState("");

  const filterCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyboard) ||
      country.region.toLowerCase().includes(keyboard) ||
      country.subregion.toLowerCase().includes(keyboard)
  );

  const onInputChange = (e) => {
    e.preventDefault();

    setKeyboard(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <div className={styles.input}>
          <SearchInput
            placehilder="Filter by Name, Region or SubRegion"
            onChange={(e) => onInputChange(e)}
          />
        </div>
      </div>

      <CountriesTable countries={filterCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  return {
    props: { countries },
  };
};

import React from "react";
import { useQuery, gql } from "@apollo/client";

const App: React.FC = () => {
  const Queries = gql`
    query Me {
      Me
    }
  `;

  const { loading, error, data } = useQuery(Queries);
  // if (loading) return <div>loading..</div>;
  console.log(data?.Me);

  return (
    <div>
      <h1>Next</h1>
    </div>
  );
};

export default App;

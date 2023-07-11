import { createClient, fetchExchange } from "urql";

export const jpegdAnalyticsClient = createClient({
  url: process.env.NEXT_PONDER_GRAPHQL_URL || "http://localhost:42069",
  exchanges: [fetchExchange],
});

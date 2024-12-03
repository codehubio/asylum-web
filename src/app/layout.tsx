"use client";
import { Inter } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";
import { Grid2 } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import { Container } from "@mui/material";
import { ApolloProvider } from "@apollo/client";
import initGraphQLClient from "./lib/graphql.service";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });
  const client = initGraphQLClient();
  return (
    <html lang="en">
      <title>Từ điển tiếng Trung</title>
      <body className={inter.className}>
        <>
          <AppRouterCacheProvider>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <ApolloProvider client={client}>
                <Container maxWidth="xl">
                  <Grid2
                    container
                    display="flex"
                    spacing={2}
                    padding={2}
                    alignContent="center"
                    justifyContent="center"
                    justifyItems="center"
                  >
                    {children}
                  </Grid2>
                </Container>
              </ApolloProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </>
      </body>
    </html>
  );
}

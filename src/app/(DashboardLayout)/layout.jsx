"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import Header from "./layout/vertical/header/Header";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import App from "./app";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

export default function RootLayout({ children }) {
  const customizer = useSelector((state) => state.customizer);
  const theme = useTheme();

  return (
    <MainWrapper className={customizer.activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}>
      {customizer.isHorizontal ? "" : <Sidebar />}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up("lg")]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        <Header />
        <Container
          sx={{
            pt: '5px',
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <App>{children}</App>
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}

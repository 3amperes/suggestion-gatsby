import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import "./layout.css";

const Wrapper = styled.div`
  max-width: 1080px;
  margin: auto;
`;

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Wrapper>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </Wrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

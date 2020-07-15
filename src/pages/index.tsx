import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import L from 'leaflet';
import Layout from '../components/Layout';
import Map from '../components/Map';
import { graphql } from 'gatsby';
import PortfolioModal from '../components/PortfolioModal';
import ReactDOMServer from 'react-dom/server';
import { Button } from 'reactstrap';

const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 3;

export interface FellowType {
  name: string;
  profilepic: string; // link or name of locally stored image
  description: string;
  github: string;
  linkedin: string;
  twitter: string;
  lat: number;
  long: number;
}

// TODO type GraphQL Request!!
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IndexPage = ({
  data: { allMarkdownRemark, allImageSharp },
}: {
  data: any;
}) => {
  const allProfiles = allMarkdownRemark.nodes;
  const allProfilePics: { [index: string]: string } = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allImageSharp.nodes.forEach((ele: any) => {
    allProfilePics[ele.fluid.originalName] = ele.fluid.src;
  });

  const [isPortfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [chosenFellow, setChosenFellow] = useState<FellowType | null>(null);

  function mapEffect(baseMap: { leafletElement: L.Map } | null) {
    if (!baseMap) return;
    const { leafletElement } = baseMap;

    for (let i = 0; i < allProfiles.length; i++) {
      const fellow = allProfiles[i].frontmatter as FellowType;
      const center = new L.LatLng(fellow.lat, fellow.long);

      L.marker(center, {
        icon: L.icon({
          className: 'icon',
          iconUrl: `${allProfilePics[fellow.profilepic]}`,
          iconSize: [50, 50],
        }),
      })
        .addTo(leafletElement)
        .bindPopup(
          ReactDOMServer.renderToString(
            <MapPopup
              setPortfolioModalOpen={setPortfolioModalOpen}
              setChosenFellow={setChosenFellow}
              fellow={fellow}
            />,
          ),
        );
    }
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>MLH Fellows</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"
          rel="stylesheet"
        />
      </Helmet>
      <Map {...mapSettings} />
      <PortfolioModal
        isOpen={isPortfolioModalOpen}
        setOpen={setPortfolioModalOpen}
        fellow={chosenFellow || undefined}
      />
    </Layout>
  );
};

function MapPopup({
  fellow,
  setChosenFellow,
  setPortfolioModalOpen,
}: {
  fellow: FellowType;
  setChosenFellow: (val: FellowType) => void;
  setPortfolioModalOpen: (val: boolean) => void;
}) {
  const socialLinks = [];
  if (fellow.github) {
    socialLinks.push(
      <a
        href={`https://github.com/${fellow.github}`}
        target="_blank"
        rel="noreferrer"
        key={0}
      >
        <i className="fab fa-github" />
      </a>,
    );
  }
  if (fellow.linkedin) {
    socialLinks.push(
      <a
        href={`https://www.linkedin.com/in/${fellow.linkedin}`}
        target="_blank"
        rel="noreferrer"
        key={1}
      >
        <i className="fab fa-github" />
      </a>,
    );
  }
  if (fellow.twitter) {
    socialLinks.push(
      <a
        href={`https://twitter.com/${fellow.twitter}`}
        target="_blank"
        rel="noreferrer"
        key={2}
      >
        <i className="fab fa-github" />
      </a>,
    );
  }

  return (
    <div className="profile">
      <div>
        <h3>{fellow.name}</h3>
      </div>
      <div>
        <h4>{fellow.description}</h4>
      </div>
      <div className="divider" />
      <div className="social-links">{socialLinks}</div>
      <Button
        onClick={() => {
          setChosenFellow(fellow);
          setPortfolioModalOpen(true);
        }}
      >
        More Details
      </Button>
    </div>
  );
}

export default IndexPage;

export const profiles = graphql`
  query MyQuery {
    allMarkdownRemark {
      nodes {
        frontmatter {
          description
          github
          lat
          linkedin
          long
          name
          profilepic
          title
          twitter
        }
      }
    }
    allImageSharp {
      nodes {
        fluid(maxHeight: 100, maxWidth: 100) {
          src
          originalName
        }
      }
    }
  }
`;

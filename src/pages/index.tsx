import React, { ReactElement, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import L, { marker } from 'leaflet';
import Layout from '../components/Layout';
import Map from '../components/Map';
import { graphql } from 'gatsby';
import PortfolioModal from '../components/PortfolioModal';
import ReactDOMServer from 'react-dom/server';
import { Button } from 'reactstrap';
// Auto generated via Gatsby Develop Plugin. May need to run 'yarn develop' for it to appear
import { FellowDataQuery } from '../../graphql-types';
import { Marker, Popup } from 'react-leaflet';

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
  lat: string;
  long: string;
}

const IndexPage = ({
  data: { allMarkdownRemark, allImageSharp },
}: {
  data: FellowDataQuery;
}) => {
  const allProfiles = allMarkdownRemark.nodes;
  const allProfilePics: { [index: string]: string } = {};

  allImageSharp.nodes.forEach((ele) => {
    if (!ele.fluid || !ele.fluid.originalName) return;
    allProfilePics[ele.fluid.originalName] = ele.fluid.src;
  });

  const [isPortfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [chosenFellow, setChosenFellow] = useState<FellowType | null>(null);

  const markers = useMemo(() => {
    const ret: ReactElement[] = [];
    for (let i = 0; i < allProfiles.length; i++) {
      const fellow = allProfiles[i].frontmatter as FellowType;
      const center = new L.LatLng(
        parseFloat(fellow.lat),
        parseFloat(fellow.long),
      );

      ret.push(
        <Marker
          position={center}
          key={fellow.name + fellow.lat}
          icon={L.icon({
            className: 'icon',
            iconUrl: `${allProfilePics[fellow.profilepic]}`,
            iconSize: [50, 50],
          })}
        >
          <Popup>
            <MapPopup
              setPortfolioModalOpen={setPortfolioModalOpen}
              setChosenFellow={setChosenFellow}
              fellow={fellow}
            />
          </Popup>
        </Marker>,
      );
    }
    return ret;
  }, [
    setPortfolioModalOpen,
    setChosenFellow,
    allImageSharp,
    allMarkdownRemark,
  ]);
  const mapSettings = {
    center: CENTER,
    defaultBaseMap: 'OpenStreetMap',
    zoom: DEFAULT_ZOOM,
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
      <Map {...mapSettings}>{markers}</Map>
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
  query FellowData {
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

import React, { ReactElement, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import Layout from '../components/Layout';
import Map from '../components/Map';
import { graphql } from 'gatsby';
import PortfolioModal from '../components/PortfolioModal';
import { Button } from 'reactstrap';
// Auto generated via Gatsby Develop Plugin. May need to run 'yarn develop' for it to appear
import { FellowDataQuery } from '../../graphql-types';
import { Marker, Popup } from 'react-leaflet';
import { Fellow, FellowType } from '../data/fellow-type';
import { Link } from 'gatsby';

const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 3;

const IndexPage = ({
  data: { allMarkdownRemark, allImageSharp },
}: {
  data: FellowDataQuery;
}) => {
  const allProfiles = allMarkdownRemark.nodes;

  const [isPortfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [chosenFellow, setChosenFellow] = useState<Fellow | null>(null);

  const createClusterCustomIcon = (cluster: { getChildCount: () => void }) => {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'marker-cluster-custom',
      iconSize: L.point(50, 50, true),
    });
  };

  // we likely don't want to generate this every render haha
  const markers = useMemo(() => {
    const ret: ReactElement[] = [];

    for (let i = 0; i < allProfiles.length; i++) {
      const fellow = new Fellow(
        allProfiles[i].frontmatter as FellowType,
        allImageSharp,
      );

      const center = new L.LatLng(fellow.lat, fellow.long);

      ret.push(
        <Marker
          position={center}
          key={fellow.name + fellow.lat}
          icon={L.icon({
            className: 'icon',
            iconUrl:
              fellow.profilePictureUrl ||
              allImageSharp.nodes.find((ele) => {
                if (!ele || !ele.fluid) return false;
                return ele.fluid.originalName === 'mlh.png';
              })?.fluid?.src ||
              'none',
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
    return (
      <MarkerClusterGroup
        showCoverageOnHover={false}
        iconCreateFunction={createClusterCustomIcon}
      >
        {ret}
      </MarkerClusterGroup>
    );
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
      {/* <Route
        path={'/test'}
        render={() => {
          <PortfolioModal/>;
        }}
      /> */}
    </Layout>
  );
};

function MapPopup({
  fellow,
  setChosenFellow,
  setPortfolioModalOpen,
}: {
  fellow: Fellow;
  setChosenFellow: (val: Fellow) => void;
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
        <i className="fab fa-linkedin" />
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
        <i className="fab fa-twitter" />
      </a>,
    );
  }

  return (
    <div className="profile text-center">
      <div>
        <h4>{fellow.name}</h4>
      </div>
      <div>
        <p>{fellow.description}</p>
      </div>
      <div className="divider" />
      <div className="social-links">{socialLinks}</div>
      <Link
        to={`/test`}
        state={{
          modal: true,
        }}
      >
        <Button className="mt-4" color={'success'}>
          More Details
        </Button>
      </Link>
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

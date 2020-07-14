import React from 'react';
import { Helmet } from 'react-helmet';
import L from 'leaflet';
import Layout from 'components/Layout';
import Map from 'components/Map';
import { graphql } from 'gatsby';

const LOCATION = {
  lat: 0,
  lng: 0,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 3;

const IndexPage = ({ data }) => {
  const allProfiles = data.allMarkdownRemark.nodes;

  async function mapEffect({ leafletElement } = {}) {
    if ( !leafletElement ) return;
    for ( let i = 0; i < allProfiles.length; i++ ) {
      const fellow = allProfiles[i].frontmatter;
      const center = new L.LatLng( fellow.lat, fellow.long );
      let social = '';
      if ( fellow.github ) {
        social += `<a href='https://github.com/${fellow.github}' target='_blank' rel="noreferrer"><i class="fab fa-github"></i></a>`;
      }
      if ( fellow.linkedin ) {
        social += `<a href='https://www.linkedin.com/in/${fellow.linkedin}' target='_blank' rel="noreferrer"><i class="fab fa-linkedin"></i></a>`;
      }
      if ( fellow.twitter ) {
        social += `<a href='https://twitter.com/${fellow.twitter}' target='_blank' rel="noreferrer"><i class="fab fa-twitter"></i></a>`;
      }

      const profilePop = `
          <div class="profile">
            <div><h3>${fellow.name}</h3></div>
            <div><h4>${fellow.description}</h4></div>
            <div class='divider'></div>
            <div class='social-links'>
              ${social}
            </div>
          </div>
        `;

      L.marker( center, {
        icon: L.icon({
          className: 'icon',
          iconUrl: `images/${fellow.profilepic}`,
          iconSize: 50,
        }),
      })
        .addTo( leafletElement )
        .bindPopup( profilePop );
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
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" rel="stylesheet" />
      </Helmet>
      <Map {...mapSettings}></Map>
    </Layout>
  );
};

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
  }
`;

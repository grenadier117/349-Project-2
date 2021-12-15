import React from "react"

import './Authors.css'

export default function Authors() {
  return (
    <div className="resources">
      <h2>Resources:</h2>
      <div className="authors">
        <div>
          <h3>Contributions:</h3>
          <h4>Jake Hamo</h4>
          <h4>Terrell D Lemons</h4>
          <h4>Rainier Sarmiento</h4>
        </div>
        <div>
          <h3>Packages and Data Sources:</h3>
          <h4>
            <a href="https://yarnpkg.com/en/">Yarn</a>
          </h4>
          <h4> 
            <a href="https://www.gatsbyjs.org/">Gatsby</a>
          </h4>
          <h4>
            <a href="https://react-leaflet.js.org/">React Leaflet</a>
          </h4>
          <h4>
            <a href="https://www.chartjs.org/">Chart.js</a>
          </h4>
          <h4>
            <a href="https://corona.lmao.ninja">Data source</a>
          </h4>
        </div>
        <div>
          <h3>Github:</h3>
          <h4>Our Github Project: 
            <a href="https://github.com/grenadier117/349-Project-2"> 349-Project-2</a>
          </h4>
          <h4>Gatsby Starter Leaflet: 
            <a href="https://github.com/colbyfayock/gatsby-starter-leaflet"> Gatsby</a>
          </h4>
        </div>
        <div>
          <h3>Resources to Learn About Mapping:</h3>
          <h4> 
            <a href="https://egghead.io/playlists/mapping-with-react-leaflet-e0e0?af=atzgap">Mapping with React Leaflet:</a> (egghead.io)
          </h4>
          <h4>
            <a href="https://www.freecodecamp.org/news/easily-spin-up-a-mapping-app-in-react-with-leaflet/"> How to build a mapping app in React the easy way with Leaflet </a> (freecodecamp.org)

          </h4>
          <h4> 
            <a href="https://www.colbyfayock.com/2020/03/anyone-can-map-inspiration-and-an-introduction-to-the-world-of-mapping/"> Anyone Can Map! Inspiration and an introduction to the world of mapping </a> (colbyfayock.com)
          </h4>
        </div>
      </div>      
      
    </div>
  )
}

// Demo at http://js.cytoscape.org/demos/59e38e9f20e25a293e44/

$(function(){

  var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),

    layout: {
      name: 'cose-bilkent'
    },

    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#ad1a66'
        }
      },

      {
        selector: ':parent',
        style: {
          'background-opacity': 0.333
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ad1a66'
        }
      }
    ],

    elements: [
      {
        "data": {
          "id": "n0"
        },
        "position": {
          "x": 122.50374073929,
          "y": 367.9832978835
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n0:n0",
          "parent": "n0"
        },
        "position": {
          "x": 209.06743208824,
          "y": 382.70652846235
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n0:n1",
          "parent": "n0"
        },
        "position": {
          "x": 142.2888292225,
          "y": 450.92046107174
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n0:n2",
          "parent": "n0"
        },
        "position": {
          "x": 182.22148831516,
          "y": 298.98997315343
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n0:n3",
          "parent": "n0"
        },
        "position": {
          "x": 121.52030011363,
          "y": 368.17931244036
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n0:n4",
          "parent": "n0"
        },
        "position": {
          "x": 35.940049390334,
          "y": 354.52885825453
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n0:n5",
          "parent": "n0"
        },
        "position": {
          "x": 98.239557102986,
          "y": 285.04613469526
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n2"
        },
        "position": {
          "x": 467.02670207978,
          "y": 80.277384269917
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n2:n0",
          "parent": "n2"
        },
        "position": {
          "x": 417.41787415333,
          "y": 125.50672352045
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n2:n1",
          "parent": "n2"
        },
        "position": {
          "x": 548.21547807074,
          "y": 106.01744529364
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n2:n4",
          "parent": "n2"
        },
        "position": {
          "x": 469.07146102348,
          "y": 45.714770370077
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n2:n7",
          "parent": "n2"
        },
        "position": {
          "x": 385.83792608882,
          "y": 35.048045019383
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n3"
        },
        "position": {
          "x": 570.06967973186,
          "y": 365.37912982515
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n3:n1",
          "parent": "n3"
        },
        "position": {
          "x": 420.8386954496,
          "y": 481.72758382436
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n3:n3",
          "parent": "n3"
        },
        "position": {
          "x": 446.2998244041,
          "y": 298.3920866192
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n3:n7",
          "parent": "n3"
        },
        "position": {
          "x": 415.94371398836,
          "y": 392.69607603289
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "p0",
          "parent": "n3"
        },
        "position": {
          "x": 633.41462027513,
          "y": 347.88365391523
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n3:n0",
          "parent": "p0"
        },
        "position": {
          "x": 636.55065268864,
          "y": 350.86610041899
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n3:n2",
          "parent": "p0"
        },
        "position": {
          "x": 552.63359507491,
          "y": 378.53275341426
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n3:n4",
          "parent": "p0"
        },
        "position": {
          "x": 628.82125037573,
          "y": 436.73663200451
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n3:n5",
          "parent": "p0"
        },
        "position": {
          "x": 714.19564547536,
          "y": 312.45095016799
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n3:n6",
          "parent": "p0"
        },
        "position": {
          "x": 635.21429504939,
          "y": 259.03067582595
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n4"
        },
        "position": {
          "x": 326.38766697778,
          "y": 258.30292961787
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n5"
        },
        "position": {
          "x": 290.10860135152,
          "y": 99.316754428304
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n6"
        },
        "position": {
          "x": 272.38405206655,
          "y": 182.52871956189
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n7"
        },
        "position": {
          "x": 317.19560811173,
          "y": 342.78742861889
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n1:n4"
        },
        "position": {
          "x": 309.02204423694,
          "y": 453.30655720988
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "n1:n5"
        },
        "position": {
          "x": 314.06982432382,
          "y": 539.34437481786
        },
        "group": "nodes",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e0",
          "source": "n0:n4",
          "target": "n0:n5"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e3",
          "source": "n0:n2",
          "target": "n0:n5"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e4",
          "source": "n2:n1",
          "target": "n2:n4"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e5",
          "source": "n0:n3",
          "target": "n0:n4"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e6",
          "source": "n3",
          "target": "n2"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e7",
          "source": "n5",
          "target": "n6"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e8",
          "source": "n5",
          "target": "n2"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e9",
          "source": "n3:n3",
          "target": "n3:n2"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e11",
          "source": "n0:n0",
          "target": "n0:n1"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e12",
          "source": "n0:n3",
          "target": "n0:n2"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e13",
          "source": "n3:n6",
          "target": "n3:n0"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e14",
          "source": "n3:n4",
          "target": "n3:n2"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e15",
          "source": "n3:n3",
          "target": "n2:n0"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e16",
          "source": "n2:n4",
          "target": "n2:n7"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e17",
          "source": "n3:n7",
          "target": "n3:n3"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e18",
          "source": "n3:n2",
          "target": "n3:n0"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e19",
          "source": "n6",
          "target": "n4"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e20",
          "source": "n4",
          "target": "n3"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e23",
          "source": "n0",
          "target": "n7"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e24",
          "source": "n0:n3",
          "target": "n0:n5"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e28",
          "source": "n0:n0",
          "target": "n0:n2"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e30",
          "source": "n0:n0",
          "target": "n0:n3"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e33",
          "source": "n7",
          "target": "n3"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e34",
          "source": "n3:n1",
          "target": "n3:n7"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e36",
          "source": "n0:n3",
          "target": "n0:n1"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e39",
          "source": "n3:n0",
          "target": "n3:n4"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e41",
          "source": "n2:n0",
          "target": "n2:n4"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e43",
          "source": "n3:n0",
          "target": "n3:n5"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e45",
          "source": "n7",
          "target": "n4"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e46",
          "source": "n2:n7",
          "target": "n2:n0"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e47",
          "source": "n2:n1",
          "target": "n3:n6"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e49",
          "source": "n3:n6",
          "target": "n3:n5"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e1",
          "source": "n3:n7",
          "target": "n1:n4"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e2",
          "source": "n0:n0",
          "target": "n1:n4"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      },
      {
        "data": {
          "id": "e10",
          "source": "n1:n5",
          "target": "n1:n4"
        },
        "position": {

        },
        "group": "edges",
        "removed": false,
        "selected": false,
        "selectable": true,
        "locked": false,
        "grabbed": false,
        "grabbable": true,
        "classes": ""
      }
    ]
  });
});

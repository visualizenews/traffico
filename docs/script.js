const URL = './data/data.json';
const MARGINS = [30, 30, 20, 20];

(() => {
  let rawData = [];
  const data = {};
  const charts = [];
  
  const reset = () => {
    // Clean charts on resize
    drawCharts();
  };

  const drawChartsContainers = () => {};

  const drawCharts = () => {
    let screenSize = 'S';
    if (window.matchMedia('screen and (min-width:1280px)').matches) {
      screenSize = 'XL';
    } else if (window.matchMedia('screen and (min-width:1024px)').matches) {
      screenSize = 'L';
    } else if (window.matchMedia('screen and (min-width:768px)').matches) {
      screenSize = 'M';
    }
  };

  const prepareData = (data) => {
  };
  
  const main = () => {
    moment.locale('it');
    fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Server Error while Loading Data');
        }
        return response.json();
      })
      .then(jsonData => {
        if (!jsonData.error) {
          prepareData(jsonData);
          drawChartsContainers();
          window.addEventListener('resize', reset);
          reset();
          document.querySelector('body').classList.add('exit');
          setTimeout(() => { document.querySelector('body').classList.remove('loading'); document.querySelector('body').classList.remove('exit'); }, 501);
        } else {
          document.querySelector('#loadingMessage').innerHTML = 'Abbiamo dei piccoli e risolvibilissimi problemi nel caricare i dati. Puoi ricaricare la pagina, o riprovare tra qualche minuto.';
          throw new Error('Error Loading Data', jsonData.message);
        }
      })
      .catch(
        e => {
          document.querySelector('#loadingMessage').innerHTML = 'Abbiamo dei piccoli e risolvibilissimi problemi nel caricare i dati. Puoi ricaricare la pagina, o riprovare tra qualche minuto.';
          throw new Error('Error Loading Data', e);
        }
      );
    fetch(document.querySelector('#corporate').getAttribute('href'))
      .then(response => response.text())
      .then(content => {
        document.querySelector('#container-corporate').innerHTML =content;
      });
    fetch(document.querySelector('#legal').getAttribute('href'))
      .then(response => response.text())
      .then(content => {
        document.querySelector('#container-legal').innerHTML =content;
      });
  }
  const ready = () => {
    if (document.readyState != 'loading') {
        main();
    } else {
        document.addEventListener('DOMContentLoaded', main);
    }
  };
  ready();
})()
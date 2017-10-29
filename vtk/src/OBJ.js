console.log("Hello OBJ");

//var httpHelper = vtk.IO.Core.DataAccessHelper.HttpDataAccessHelper.newInstance();

var urlExtract = vtk.Common.Core.vtkURLExtract.extractURLParameters;
var fullScreenRenderer = vtk.Rendering.Misc.vtkFullScreenRenderWindow.newInstance({ background: [0, 0, 0] });

var objReader = vtk.IO.Misc.vtkOBJReader.newInstance();
var mtlReader = vtk.IO.Misc.vtkMTLReader.newInstance();
var mapper = vtk.Rendering.Core.vtkMapper.newInstance();
var actor = vtk.Rendering.Core.vtkActor.newInstance();


const iOS = /iPad|iPhone|iPod/.test(window.navigator.platform);
let autoInit = true;

if (iOS) {
  document.querySelector('body').classList.add('is-ios-device');
}


function emptyContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function loadOBJ(container, options) {
  emptyContainer(container);
  const renderer = fullScreenRenderer.getRenderer();
  const renderWindow = fullScreenRenderer.getRenderWindow();

  const reader = new FileReader();
  reader.onload = function onLoad(e) {
  objReader.parse(reader.result);
  const nbOutputs = objReader.getNumberOfOutputPorts();
    for (let idx = 0; idx < nbOutputs; idx++) {
      const source = objReader.getOutputData(idx);
      actor.setMapper(mapper);
      mapper.setInputData(source);
      renderer.addActor(actor);
    }
    renderer.resetCamera();
    renderWindow.render();
  };
  console.log(options.objfile);
  reader.readAsText(options.objfile);

}

const userParams = urlExtract();
console.log(userParams);
if (userParams.objfile) {
  const rootBody = document.querySelector('body');
  loadOBJ(rootBody, userParams);
}

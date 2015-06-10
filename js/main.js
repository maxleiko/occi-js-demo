var factory = new OCCI.occi.factory.DefaultOcciFactory();

// Let's create a Docker extension
// https://github.com/occiware/ecore/blob/master/metamodel/docker/Docker.xmi

// create an extension
var ext = factory.createExtension();
ext.name = 'OCCIware Docker';

// create a model listener to view modifications
ext.addModelTreeListener({
	elementChanged: function (trace) {
		// check the log to see the traces
		console.log(trace.etype.name(), trace);
	}
});

// create the Container Kind
var contKind = factory.createKind();
contKind.term = 'container';
contKind.title = 'Container Resource';
// add it to the extension
ext.addKinds(contKind);

// create the Name Attribute
var nameAttr = factory.createAttribute();
nameAttr.name = 'name';
nameAttr.required = true;
nameAttr.description = 'The name of this Container instance';
// add it to the kind
contKind.addAttributes(nameAttr);

// TODO the rest of the attributes & stuff

// create an XMI serializer
var xmiSaver = factory.createXMISerializer();
var xmiModel = xmiSaver.serialize(ext);
document.querySelector('#xmi').innerHTML = xmiModel.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
   return '&#'+i.charCodeAt(0)+';';
});

// create a JSON serializer
var jsonSaver = factory.createJSONSerializer();
var jsonModel = jsonSaver.serialize(ext);
jsonModel = JSON.stringify(JSON.parse(jsonModel), null, 2); // tricks to pretty print the JSON
document.querySelector('#json').innerHTML = jsonModel;
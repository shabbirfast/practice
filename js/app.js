// Developer : ID KHAN ( Email: uddinislam46@gmail.com / WhatApp: 923323967646 )
// =========== [ Print console log into custom element on frontend ] ===========
printConsole =  (outputSelector, message) =>  {
    document.getElementById(outputSelector).rows=document.getElementById(outputSelector).rows+1;
    (document.getElementById(outputSelector))?document.getElementById(outputSelector).value += message+"\n":console.log(`Output selector "${outputSelector}" not found`);
}

// =========== [ Read JS source code from file and set into DOM element on frontend ] ===========
getJsSourceCode=jsSource => fetch(jsSource.file)
.then(response => response.text())
.then(text => {
        if(!document.getElementById(jsSource.inputSelector)){
            console.log(`Input selector "${jsSource.inputSelector}" entry found in array of objects reference variable i-e jsSources but frontend DOM don't have such selector to show JS file source code`)
            return;
        }
        if(jsSource.editor===null){
            var textArea = document.getElementById(jsSource.inputSelector)
            jsSource.editor = CodeMirror.fromTextArea(textArea);
            jsSource.editor.doc.setValue(text)              
            // reset output
            if(document.getElementById(jsSource.outputSelector)){
                document.getElementById(jsSource.outputSelector).value="";
                document.getElementById(jsSource.outputSelector).rows=1;                
            }
            executeJs(jsSource.inputSelector)      
        }else{
            jsSource.editor.doc.setValue(text)        
        }
    }
);

// =========== [ JS Executer ] ===========
function executeJs(inputSelector, output=true) {
    // filter jsSource array based on object's selector value    
    var jsSource = jsSources.filter( el =>  el.inputSelector === inputSelector)[0];
    if(!jsSource){
        console.log(`Input selector "${inputSelector}" entry not found in array of objects reference variable i-e jsSources. Try adding Js Source file object into jsSources refrence.`)
        return;
    }
    // get current JS code
    let js_code=jsSource.editor.doc.getValue();
      // reset output
    if(output && document.getElementById(jsSource.outputSelector)){
            document.getElementById(jsSource.outputSelector).value="";
            document.getElementById(jsSource.outputSelector).rows=1;                
    }
    // Execute Js Code
    try{
      eval(js_code);
      // js_code=js_code.replaceAll("\",","\"+"); // condition handled if console.log used with comma
      if(output) eval(js_code.replaceAll("console.log(",`printConsole("${jsSource.outputSelector}",`));  
    }catch(e){
      console.log(e)
      if(output) printConsole(jsSource.outputSelector, e);
    }
}

// =========== [ Get and Show JS Source Code ] ===========
// js sources's, reference of array of objects, first entry as default
let jsSources=[
    { file: 'js/assignment2.js', inputSelector:'input-2', outputSelector:'output-2', editor:null},
];

// js sources's, reference of array of objects, dynamic entry as all js files following same sequence.
for(fileSequence=3; fileSequence<=45; fileSequence++){
    jsSources.push({
        file: 'js/assignment'+fileSequence+'.js', inputSelector:'input-'+fileSequence, outputSelector:'output-'+fileSequence, editor:null
    })
}
// show sources and their output.
jsSources.forEach(assignment => {     
    getJsSourceCode(assignment)
});




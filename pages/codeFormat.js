import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2'

const CodeFormat = ({data}) => {
    
    return (<CodeMirror
        //onChange={code => setCode(code)}
        value={data}
        options={{
            mode: 'python',
            theme: 'material',
            lineNumbers: true,
            readOnly: true,
            //lineWrapping: true,
            viewportMargin: Infinity
        }
        }
    />)
};

export default CodeFormat
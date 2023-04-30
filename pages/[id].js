import styles from '@/styles/id.module.css'
import React, { useEffect, useRef, useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-mirage.css'
import axios from "axios";
import { useRouter } from 'next/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Editor = () => {
  const [code, setCode] = useState("");
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const editor = useRef()
  const { id, name } = router.query;

  useEffect(() => {
    if (router.asPath !== router.route) {
      async function raj() {
        const { id } = router.query
        await axios.get('/api/hello?id=' + id).then((red) => {
          const CodeMirror = require('codemirror');
          editor.current = CodeMirror.fromTextArea(document.getElementById("editor.current"), {
            lineNumbers: true,
            theme: 'ayu-mirage',
            mode: { name: 'javascript', json: true },
            autocorrect: true,
            autoCloseTags: true,
          });
          setCode(editor.current.getValue());

          editor.current.on("change", (cm) => {
            setCode(cm.getValue());
          });
          if (red.data[0]) {
            setProductInfo(red.data[0])
            editor.current.setValue(red.data[0].code)
          }
        }
        )
      }
      raj()
    }
  }, [router])

  async function runlink() {
    const { id, name } = router.query;
    if (name || id) {
      await axios.post('/api/hello', { code, id, name })
      router.reload()
    }
  }
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast("Copied to clipboard");
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '#my-table' });
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "my-text.txt";
    document.body.appendChild(element);
    element.click();
    toast("Downloaded");
  }


  return (
    <div className={styles.maincont}>
      <div className={styles.room}>
        <div className={styles.con1}>
          <div className={styles.name}>
            <img src='coding-folder.png' className={styles.img} />
            <div>Sharecode.com</div>
          </div>
          <div className={styles.b}>
            {!productInfo?.code && <button onClick={runlink} className={styles.btt}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg> Make a Link
            </button>}

            <button className={styles.btt} onClick={copyToClipboard} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
              Copy
            </button>
            <button className={styles.btt} onClick={handleDownload}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download
            </button>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={800}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className={styles.con2}>
          <textarea id='editor.current'></textarea>
        </div>
      </div>
    </div>
  )
}

export default Editor;

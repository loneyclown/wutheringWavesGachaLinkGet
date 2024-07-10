import React from 'react'

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const [filePath, setFilePath] = React.useState<string>('')
  const [link, setLink] = React.useState<string>('')

  const handleClick = async (): Promise<void> => {
    const filePaths = await window.api.selectDirs()
    if (filePaths.length > 0) {
      const newFilePath = filePaths[0]
      setFilePath(newFilePath)

      const logPath = window.api.path.join(newFilePath, 'Saved', 'Logs', 'Client.log')
      const content: string = window.api.fs.readFileSync(logPath, 'utf-8')
      // console.log('content', content)
      const regex =
        /https:\/\/aki-gm-resources.aki-game.com\/aki\/gacha\/index.html#\/record\?svr_id=([a-zA-Z0-9])*&player_id=(\d+)(.*)",/g
      const matches = content.matchAll(regex)
      let linkStr = ''
      for (const match of matches) {
        linkStr = match[0].slice(0, -2)
      }
      setLink(linkStr)
    }
  }

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32 w-full h-full">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                鸣潮抽卡连接提取工具
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                选择安装鸣潮的文件夹，需要到Client目录，比如：
              </p>
              <p>D:\GAME\Wuthering Waves\Wuthering Waves Game\Client</p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <input
                  value={filePath}
                  readOnly
                  placeholder="选择你的文件夹"
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={handleClick}
                  className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  选择文件夹
                </button>
              </div>
            </div>
            <div>
              <textarea
                className="w-full border-0 bg-transparent text-light-white"
                value={link}
                readOnly
              ></textarea>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
      </div>
    </>
  )
}

export default App

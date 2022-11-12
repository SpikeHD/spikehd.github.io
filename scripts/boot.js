const initialMessage = `SPIKEBIOS (C) 2003 Canadian Megatrends, Inc. <br/>
ASUS P3N15 ACPI BIOS Revision 1337 <br/>
CPU: INTEL (R) Core(TM) i3-530 CPU 2.93GHz <br/>
\tSpeed: 2.90 GHz <br/><br/>

Press DEL to do Nothing <br/>
Press F8 for NO POPUP <br/>
`
const messages = [
  'Booting from hard disk: DISK0',
  'Memory (RAM) check...',
  'SYSFAN check...',
  'CPUFAN check...',
  'CPU CYCLE check...',
  'GPUFAN check...',
  'GPU CYCLE check...',
  'Initializing boot partition',
  'Initialized boot partition',
  'Initializing operating system: ms-spin32-xp',
  'Initialized operating system',
]

document.addEventListener('DOMContentLoaded', async () => {
  await wait(500)
  startBoot()
})

/**
 * Main boot effect stuff
 */
async function startBoot() {
  // First show Canadian Megatrends stuff
  const megatrends = document.querySelector('#console .container #megatrends')
  const initialDiv = document.createElement('div')

  initialDiv.innerHTML = initialMessage
  initialDiv.className = ''
  megatrends.appendChild(initialDiv)
  megatrends.style = ''

  await wait(5000)

  // Now remove megatrends stuff
  megatrends.style = 'display: none'

  for (const msg of messages) {
    await wait(rand(200, 800))

    await doConsoleMessage(msg)
  }

  // This is a zero-width char
  doConsoleMessage('​')

  await wait(500)

  doConsoleMessage('It\'s time to rock.')

  // Final wait before sending to "login screen"
  await wait(3000)

  await endBoot()
}

/**
 * Push a message to the "console"
 * 
 * @param {string} m Message to show
 * @returns 
 */
async function doConsoleMessage(m) {
  const consoleContainer = document.querySelector('#console .container')
  const message = document.createElement('div')

  message.className = 'message'
  message.innerHTML = m

  // This is something that has to "load" a status (OK/ERR/etc)
  if (m.endsWith('...')) {
    const isErr = rand(0, 5) === 3
    const statusColor = isErr ? 'red' : 'green'
    const appended = consoleContainer.appendChild(message)

    await wait(rand(200, 1000))

    // Now append the status
    appended.innerHTML = `${appended.innerHTML} <span class="console_append ${statusColor}">${isErr ? 'ERR' : 'OK'}</span>`

    return
  }

  consoleContainer.appendChild(message)
}

/**
 * Cleanup sequence, show loading screen briefly, then remove that as well
 */
async function endBoot() {
  const consoleElm = document.querySelector('#console')
  const bootElm = document.querySelector('#boot')
  consoleElm.innerHTML = ''

  await wait(1000)

  consoleElm.remove()

  await wait(5000)

  bootElm.remove()
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function rand(min, max) {
  return Math.floor(Math.random() * (max-min)) + min
}
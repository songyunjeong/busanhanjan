const btnEl = document.querySelector('.share-or-copy')


const isSupportedShare = !!navigator?.share
const isSupportedClipboard = !!navigator?.clipboard
const isSupportedClipboardCommand = document.queryCommandSupported?.('copy')


const healthEl = document.createElement('div')
healthEl.style.display = 'none'
healthEl.innerHTML = `s: ${isSupportedShare}, c: ${isSupportedClipboard}, cc: ${isSupportedClipboardCommand}`
document.body.append(healthEl)


async function startNativeShare() {
  await navigator.share({
    title: '나와 잘맞는 주류 찾기!',
    text: '나와 잘맞는 주류 찾기',
    url: location.href 
  })
}


async function copyToClipboard() {

  if (isSupportedClipboardCommand) {
    const textarea = document.createElement('textarea')
    textarea.style.position = 'fixed'
    textarea.style.top = 0
    textarea.style.left = 0
    textarea.value = location.href

    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert('링크를 복사했어요 ><')
    return
  }
  if (isSupportedClipboard) {
    await navigator.clipboard.writeText(location.href)
    alert('링크를 복사했어요 ><')
  }
}


if (!isSupportedShare && !isSupportedClipboard && !isSupportedClipboardCommand) {
  btnEl.style.display = 'none'
}

btnEl?.addEventListener('click', async function () {
  if (isSupportedShare) {
    await startNativeShare()
    return
  }
  if (isSupportedClipboard || isSupportedClipboardCommand) {
    await copyToClipboard()
  }
})

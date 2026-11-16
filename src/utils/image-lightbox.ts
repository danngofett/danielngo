let dialog: HTMLDialogElement | undefined
let initialised = false

function createDialog() {
  const el = document.createElement('dialog')
  el.className = 'image-lightbox'
  el.setAttribute('aria-label', 'Enlarged image')
  el.innerHTML = `
    <button type="button" class="image-lightbox__close" aria-label="Close enlarged image">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <figure class="image-lightbox__figure">
      <img class="image-lightbox__img" alt="" />
      <figcaption class="image-lightbox__caption"></figcaption>
    </figure>
  `

  // Clicking anywhere except the picture or caption closes it.
  el.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (!target.closest('.image-lightbox__img, .image-lightbox__caption')) {
      el.close()
    }
  })

  document.body.append(el)
  return el
}

function open(trigger: HTMLElement) {
  const { zoomSrc, zoomAlt = '', zoomCaption = '' } = trigger.dataset
  if (!zoomSrc) return

  dialog ??= createDialog()

  const img = dialog.querySelector<HTMLImageElement>('.image-lightbox__img')!
  const caption = dialog.querySelector<HTMLElement>('.image-lightbox__caption')!

  img.src = zoomSrc
  img.alt = zoomAlt
  caption.textContent = zoomCaption
  caption.hidden = !zoomCaption

  dialog.showModal()
}

/** Click-to-enlarge for any `.image-zoom` button rendered by BaseImage. */
export function initImageLightbox() {
  if (initialised) return
  initialised = true

  document.addEventListener('click', (event) => {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>(
      '.image-zoom',
    )
    if (trigger) open(trigger)
  })
}

/**
 * TypeScript JSX type definitions for custom JSX runtime
 */

declare namespace JSX {
  interface IntrinsicElements {
    // HTML Elements
    a: HTMLAttributes<HTMLAnchorElement>;
    abbr: HTMLAttributes<HTMLElement>;
    address: HTMLAttributes<HTMLElement>;
    area: HTMLAttributes<HTMLAreaElement>;
    article: HTMLAttributes<HTMLElement>;
    aside: HTMLAttributes<HTMLElement>;
    audio: HTMLAttributes<HTMLAudioElement>;
    b: HTMLAttributes<HTMLElement>;
    base: HTMLAttributes<HTMLBaseElement>;
    bdi: HTMLAttributes<HTMLElement>;
    bdo: HTMLAttributes<HTMLElement>;
    blockquote: HTMLAttributes<HTMLQuoteElement>;
    body: HTMLAttributes<HTMLBodyElement>;
    br: HTMLAttributes<HTMLBRElement>;
    button: HTMLAttributes<HTMLButtonElement>;
    canvas: HTMLAttributes<HTMLCanvasElement>;
    caption: HTMLAttributes<HTMLTableCaptionElement>;
    cite: HTMLAttributes<HTMLElement>;
    code: HTMLAttributes<HTMLElement>;
    col: HTMLAttributes<HTMLTableColElement>;
    colgroup: HTMLAttributes<HTMLTableColElement>;
    data: HTMLAttributes<HTMLDataElement>;
    datalist: HTMLAttributes<HTMLDataListElement>;
    dd: HTMLAttributes<HTMLElement>;
    del: HTMLAttributes<HTMLModElement>;
    details: HTMLAttributes<HTMLDetailsElement>;
    dfn: HTMLAttributes<HTMLElement>;
    dialog: HTMLAttributes<HTMLDialogElement>;
    div: HTMLAttributes<HTMLDivElement>;
    dl: HTMLAttributes<HTMLDListElement>;
    dt: HTMLAttributes<HTMLElement>;
    em: HTMLAttributes<HTMLElement>;
    embed: HTMLAttributes<HTMLEmbedElement>;
    fieldset: HTMLAttributes<HTMLFieldSetElement>;
    figcaption: HTMLAttributes<HTMLElement>;
    figure: HTMLAttributes<HTMLElement>;
    footer: HTMLAttributes<HTMLElement>;
    form: HTMLAttributes<HTMLFormElement>;
    h1: HTMLAttributes<HTMLHeadingElement>;
    h2: HTMLAttributes<HTMLHeadingElement>;
    h3: HTMLAttributes<HTMLHeadingElement>;
    h4: HTMLAttributes<HTMLHeadingElement>;
    h5: HTMLAttributes<HTMLHeadingElement>;
    h6: HTMLAttributes<HTMLHeadingElement>;
    head: HTMLAttributes<HTMLHeadElement>;
    header: HTMLAttributes<HTMLElement>;
    hgroup: HTMLAttributes<HTMLElement>;
    hr: HTMLAttributes<HTMLHRElement>;
    html: HTMLAttributes<HTMLHtmlElement>;
    i: HTMLAttributes<HTMLElement>;
    iframe: HTMLAttributes<HTMLIFrameElement>;
    img: HTMLAttributes<HTMLImageElement>;
    input: HTMLAttributes<HTMLInputElement>;
    ins: HTMLAttributes<HTMLModElement>;
    kbd: HTMLAttributes<HTMLElement>;
    label: HTMLAttributes<HTMLLabelElement>;
    legend: HTMLAttributes<HTMLLegendElement>;
    li: HTMLAttributes<HTMLLIElement>;
    link: HTMLAttributes<HTMLLinkElement>;
    main: HTMLAttributes<HTMLElement>;
    map: HTMLAttributes<HTMLMapElement>;
    mark: HTMLAttributes<HTMLElement>;
    menu: HTMLAttributes<HTMLMenuElement>;
    meta: HTMLAttributes<HTMLMetaElement>;
    meter: HTMLAttributes<HTMLMeterElement>;
    nav: HTMLAttributes<HTMLElement>;
    noscript: HTMLAttributes<HTMLElement>;
    object: HTMLAttributes<HTMLObjectElement>;
    ol: HTMLAttributes<HTMLOListElement>;
    optgroup: HTMLAttributes<HTMLOptGroupElement>;
    option: HTMLAttributes<HTMLOptionElement>;
    output: HTMLAttributes<HTMLOutputElement>;
    p: HTMLAttributes<HTMLParagraphElement>;
    picture: HTMLAttributes<HTMLElement>;
    pre: HTMLAttributes<HTMLPreElement>;
    progress: HTMLAttributes<HTMLProgressElement>;
    q: HTMLAttributes<HTMLQuoteElement>;
    rp: HTMLAttributes<HTMLElement>;
    rt: HTMLAttributes<HTMLElement>;
    ruby: HTMLAttributes<HTMLElement>;
    s: HTMLAttributes<HTMLElement>;
    samp: HTMLAttributes<HTMLElement>;
    script: HTMLAttributes<HTMLScriptElement>;
    search: HTMLAttributes<HTMLElement>;
    section: HTMLAttributes<HTMLElement>;
    select: HTMLAttributes<HTMLSelectElement>;
    slot: HTMLAttributes<HTMLSlotElement>;
    small: HTMLAttributes<HTMLElement>;
    source: HTMLAttributes<HTMLSourceElement>;
    span: HTMLAttributes<HTMLSpanElement>;
    strong: HTMLAttributes<HTMLElement>;
    style: HTMLAttributes<HTMLStyleElement>;
    sub: HTMLAttributes<HTMLElement>;
    summary: HTMLAttributes<HTMLElement>;
    sup: HTMLAttributes<HTMLElement>;
    table: HTMLAttributes<HTMLTableElement>;
    tbody: HTMLAttributes<HTMLTableSectionElement>;
    td: HTMLAttributes<HTMLTableCellElement>;
    template: HTMLAttributes<HTMLTemplateElement>;
    textarea: HTMLAttributes<HTMLTextAreaElement>;
    tfoot: HTMLAttributes<HTMLTableSectionElement>;
    th: HTMLAttributes<HTMLTableCellElement>;
    thead: HTMLAttributes<HTMLTableSectionElement>;
    time: HTMLAttributes<HTMLTimeElement>;
    title: HTMLAttributes<HTMLTitleElement>;
    tr: HTMLAttributes<HTMLTableRowElement>;
    track: HTMLAttributes<HTMLTrackElement>;
    u: HTMLAttributes<HTMLElement>;
    ul: HTMLAttributes<HTMLUListElement>;
    var: HTMLAttributes<HTMLElement>;
    video: HTMLAttributes<HTMLVideoElement>;
    wbr: HTMLAttributes<HTMLElement>;

    // SVG Elements
    svg: SVGAttributes<SVGSVGElement>;
    path: SVGAttributes<SVGPathElement>;
    circle: SVGAttributes<SVGCircleElement>;
    rect: SVGAttributes<SVGRectElement>;
    line: SVGAttributes<SVGLineElement>;
    polyline: SVGAttributes<SVGPolylineElement>;
    polygon: SVGAttributes<SVGPolygonElement>;
    g: SVGAttributes<SVGGElement>;
    defs: SVGAttributes<SVGDefsElement>;
    clipPath: SVGAttributes<SVGClipPathElement>;
    linearGradient: SVGAttributes<SVGLinearGradientElement>;
    radialGradient: SVGAttributes<SVGRadialGradientElement>;
    stop: SVGAttributes<SVGStopElement>;
    ellipse: SVGAttributes<SVGEllipseElement>;
    text: SVGAttributes<SVGTextElement>;
    tspan: SVGAttributes<SVGTSpanElement>;
    use: SVGAttributes<SVGUseElement>;
  }

  interface HTMLAttributes<T = HTMLElement> {
    // Standard HTML Attributes
    accessKey?: string;
    className?: string;
    contentEditable?: boolean | 'true' | 'false';
    dir?: string;
    draggable?: boolean;
    hidden?: boolean;
    id?: string;
    lang?: string;
    spellcheck?: boolean;
    style?: Partial<CSSStyleDeclaration>;
    tabIndex?: number;
    title?: string;
    translate?: 'yes' | 'no';

    // WAI-ARIA
    role?: string;

    // Event handlers
    onClick?: (event: MouseEvent) => void;
    onContextMenu?: (event: MouseEvent) => void;
    onDoubleClick?: (event: MouseEvent) => void;
    onDrag?: (event: DragEvent) => void;
    onDragEnd?: (event: DragEvent) => void;
    onDragEnter?: (event: DragEvent) => void;
    onDragExit?: (event: DragEvent) => void;
    onDragLeave?: (event: DragEvent) => void;
    onDragOver?: (event: DragEvent) => void;
    onDragStart?: (event: DragEvent) => void;
    onDrop?: (event: DragEvent) => void;
    onMouseDown?: (event: MouseEvent) => void;
    onMouseEnter?: (event: MouseEvent) => void;
    onMouseLeave?: (event: MouseEvent) => void;
    onMouseMove?: (event: MouseEvent) => void;
    onMouseOut?: (event: MouseEvent) => void;
    onMouseOver?: (event: MouseEvent) => void;
    onMouseUp?: (event: MouseEvent) => void;

    // Keyboard Events
    onKeyDown?: (event: KeyboardEvent) => void;
    onKeyPress?: (event: KeyboardEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;

    // Focus Events
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;

    // Form Events
    onChange?: (event: Event) => void;
    onInput?: (event: Event) => void;
    onInvalid?: (event: Event) => void;
    onSubmit?: (event: Event) => void;
    onReset?: (event: Event) => void;

    // Media Events
    onAbort?: (event: Event) => void;
    onCanPlay?: (event: Event) => void;
    onCanPlayThrough?: (event: Event) => void;
    onDurationChange?: (event: Event) => void;
    onEmptied?: (event: Event) => void;
    onEncrypted?: (event: Event) => void;
    onEnded?: (event: Event) => void;
    onError?: (event: Event) => void;
    onLoadedData?: (event: Event) => void;
    onLoadedMetadata?: (event: Event) => void;
    onLoadStart?: (event: Event) => void;
    onPause?: (event: Event) => void;
    onPlay?: (event: Event) => void;
    onPlaying?: (event: Event) => void;
    onProgress?: (event: Event) => void;
    onRateChange?: (event: Event) => void;
    onSeeked?: (event: Event) => void;
    onSeeking?: (event: Event) => void;
    onStalled?: (event: Event) => void;
    onSuspend?: (event: Event) => void;
    onTimeUpdate?: (event: Event) => void;
    onVolumeChange?: (event: Event) => void;
    onWaiting?: (event: Event) => void;

    // Other Events
    onLoad?: (event: Event) => void;
    onScroll?: (event: Event) => void;
    onWheel?: (event: WheelEvent) => void;

    // Clipboard Events
    onCopy?: (event: ClipboardEvent) => void;
    onCut?: (event: ClipboardEvent) => void;
    onPaste?: (event: ClipboardEvent) => void;

    // Other common attributes
    [key: string]: any;
  }

  interface SVGAttributes<T = SVGElement> {
    // Core SVG Attributes
    className?: string;
    id?: string;

    // Presentation Attributes
    fill?: string;
    stroke?: string;
    strokeWidth?: number | string;
    strokeLinecap?: 'butt' | 'round' | 'square';
    strokeLinejoin?: 'miter' | 'round' | 'bevel';
    strokeDasharray?: string | number;
    strokeDashoffset?: string | number;
    opacity?: number | string;
    fillOpacity?: number | string;
    strokeOpacity?: number | string;

    // Transform
    transform?: string;

    // SVG specific
    viewBox?: string;
    width?: number | string;
    height?: number | string;
    x?: number | string;
    y?: number | string;
    cx?: number | string;
    cy?: number | string;
    r?: number | string;
    rx?: number | string;
    ry?: number | string;
    d?: string;
    points?: string;
    x1?: number | string;
    y1?: number | string;
    x2?: number | string;
    y2?: number | string;

    // Event handlers
    onClick?: (event: MouseEvent) => void;
    onMouseDown?: (event: MouseEvent) => void;
    onMouseEnter?: (event: MouseEvent) => void;
    onMouseLeave?: (event: MouseEvent) => void;
    onMouseMove?: (event: MouseEvent) => void;
    onMouseOut?: (event: MouseEvent) => void;
    onMouseOver?: (event: MouseEvent) => void;
    onMouseUp?: (event: MouseEvent) => void;

    [key: string]: any;
  }

  type Element = Node | DocumentFragment;
}

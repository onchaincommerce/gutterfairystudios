"use client";

type WindowDotsProps = {
  closeLabel?: string;
  isMinimized?: boolean;
  isZoomed?: boolean;
  onClose?: () => void;
  onToggleMinimize?: () => void;
  onToggleZoom?: () => void;
  zoomLabel?: string;
};

export default function WindowDots({
  closeLabel = "window",
  isMinimized = false,
  isZoomed = false,
  onClose,
  onToggleMinimize,
  onToggleZoom,
  zoomLabel = "window",
}: WindowDotsProps) {
  return (
    <div className="window-dots">
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="window-dot window-dot--red window-dot--button"
          aria-label={`Close ${closeLabel}`}
          data-ui-sound="close"
        >
          <span className="window-dot__mark" aria-hidden="true">
            ×
          </span>
        </button>
      ) : (
        <span className="window-dot window-dot--red" aria-hidden="true" />
      )}

      {onToggleMinimize ? (
        <button
          type="button"
          onClick={onToggleMinimize}
          className="window-dot window-dot--yellow window-dot--button"
          aria-label={isMinimized ? `Restore ${zoomLabel}` : `Minimize ${zoomLabel}`}
          aria-pressed={isMinimized}
          data-ui-sound={isMinimized ? "expand" : "minimize"}
        >
          <span className="window-dot__mark" aria-hidden="true">
            −
          </span>
        </button>
      ) : (
        <span className="window-dot window-dot--yellow" aria-hidden="true">
          <span className="window-dot__mark" aria-hidden="true">
            −
          </span>
        </span>
      )}

      {onToggleZoom ? (
        <button
          type="button"
          onClick={onToggleZoom}
          className="window-dot window-dot--green window-dot--button"
          aria-label={isZoomed ? `Minimize ${zoomLabel}` : `Maximize ${zoomLabel}`}
          aria-pressed={isZoomed}
          data-ui-sound={isZoomed ? "minimize" : "expand"}
        >
          <span className="window-dot__mark" aria-hidden="true">
            {isZoomed ? "-" : "+"}
          </span>
        </button>
      ) : (
        <span className="window-dot window-dot--green" aria-hidden="true" />
      )}
    </div>
  );
}

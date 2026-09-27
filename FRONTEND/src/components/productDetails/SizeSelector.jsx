import React from "react";

const SizeSelector = ({
  sizes = [],
  selectedSize,
  onSizeChange,
  onSizeGuide,
}) => {
  if (!sizes.length) return null;

  return (
    <div className="size-selector-wrapper">
      {/* Embedded CSS for animations and responsiveness */}
      <style>{`
        .size-selector-wrapper {
          margin-bottom: 1.5rem;
          font-family: inherit;
        }

        .size-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .size-title {
          font-size: 0.925rem;
          font-weight: 600;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .selected-badge {
          font-weight: 700;
          color: #2563eb;
          text-transform: uppercase;
        }

        .size-guide-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 0.825rem;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .size-guide-btn:hover {
          color: #2563eb;
          background: #eff6ff;
        }

        .size-guide-btn .arrow-icon {
          transition: transform 0.2s ease;
        }

        .size-guide-btn:hover .arrow-icon {
          transform: translateX(3px);
        }

        /* Sizes Container */
        .size-options-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* Size Button Styling & Animations */
        .size-btn {
          position: relative;
          min-width: 52px;
          height: 46px;
          padding: 0 16px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #ffffff;
          color: #334155;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        }

        .size-btn:hover {
          border-color: #93c5fd;
          color: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.08);
        }

        .size-btn:active {
          transform: scale(0.96);
        }

        /* Selected State */
        .size-btn.selected {
          background: #2563eb;
          border-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
          transform: translateY(-1px);
        }

        .size-btn.selected:hover {
          background: #1d4ed8;
          border-color: #1d4ed8;
        }

        /* Mobile Adjustments */
        @media (max-width: 480px) {
          .size-btn {
            flex: 1 1 calc(25% - 10px); /* 4 items per row on mobile */
            min-width: 46px;
            height: 42px;
            padding: 0 10px;
            font-size: 0.825rem;
          }
        }
      `}</style>

      {/* Header */}
      <div className="size-header">
        <span className="size-title">
          Size:
          {selectedSize ? (
            <span className="selected-badge">{selectedSize}</span>
          ) : (
            <span style={{ color: "#94a3b8", fontWeight: 400 }}>Choose one</span>
          )}
        </span>

        {onSizeGuide && (
          <button
            type="button"
            onClick={onSizeGuide}
            className="size-guide-btn"
            aria-label="Open size guide"
          >
            {/* Ruler SVG Icon */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z" />
              <path d="m14.5 3.5 2 2" />
              <path d="m11.5 6.5 2 2" />
              <path d="m8.5 9.5 2 2" />
              <path d="m5.5 12.5 2 2" />
            </svg>
            Size Guide
            <span className="arrow-icon">→</span>
          </button>
        )}
      </div>

      {/* Sizes Options Grid */}
      <div
        className="size-options-grid"
        role="radiogroup"
        aria-label="Size Options"
      >
        {sizes.map((size) => {
          const isSelected = selectedSize === size;

          return (
            <button
              type="button"
              key={size}
              role="radio"
              aria-checked={isSelected}
              className={`size-btn ${isSelected ? "selected" : ""}`}
              onClick={() => onSizeChange(size)}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
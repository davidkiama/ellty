import React, { useState } from "react";
import "./App.scss";

function App() {
  const [selectedPages, setSelectedPages] = useState(new Set([2, 3, 4])); // Pages 2–4 initially selected or not

  const togglePage = (pageNum) => {
    setSelectedPages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(pageNum)) {
        newSet.delete(pageNum);
      } else {
        newSet.add(pageNum);
      }
      return newSet;
    });
  };

  const toggleAllPages = () => {
    if (selectedPages.size === 3) {
      setSelectedPages(new Set());
    } else {
      setSelectedPages(new Set([2, 3, 4]));
    }
  };

  const handleDone = () => {
    const selected = [1, ...Array.from(selectedPages).sort()];
    const pages = selected.map((n) => `Page ${n}`).join(", ");
    alert(selected.length === 4 ? "All pages selected!" : `Selected: ${pages}`);
  };

  const getCheckboxSrc = (pageNum) => {
    const isChecked = pageNum === 1 || selectedPages.has(pageNum);
    const isDisabled = pageNum === 1;

    if (!isChecked) return "/svg/Property 1=Default.svg";
    if (isDisabled) return "/svg/Property 1=Variant2.svg";
    return "/svg/Property 1=Variant5.svg";
  };

  const isAllSelected = selectedPages.size === 3;

  return (
    <div className="frame">
      <div className="pages-content">
        {/* All Pages */}
        <div className={`checkbox-item ${isAllSelected ? "checked" : ""}`} onClick={toggleAllPages}>
          <span className="checkbox-label">All pages</span>
          <img src={getCheckboxSrc(0)} alt="checkbox" className="checkbox-icon" />
        </div>

        {/* Page 1 - Hardcoded: always selected + disabled */}
        <div className="checkbox-item checked ">
          <span className="checkbox-label">Page 1</span>
          <img src="/svg/Property 1=Variant2.svg" alt="checkbox" className="checkbox-icon" />
        </div>

        {/* Pages 2, 3, 4 - Dynamic */}
        {[2, 3, 4].map((pageNum) => (
          <div
            key={pageNum}
            className={`checkbox-item ${selectedPages.has(pageNum) ? "checked" : ""}`}
            onClick={() => togglePage(pageNum)}
          >
            <span className="checkbox-label">Page {pageNum}</span>
            <img src={getCheckboxSrc(pageNum)} alt="checkbox" className="checkbox-icon" />
          </div>
        ))}

        <button className="done-button" onClick={handleDone}>
          Done
        </button>
      </div>
    </div>
  );
}

export default App;

function VisitorForm({
  formData,
  handleInputChange,
  handleAddVisitor,
  setShowForm,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>Register New Visitor</h2>
            <p>Enter visitor information to record a new entry.</p>
          </div>

          <button
            className="close-btn"
            onClick={() => setShowForm(false)}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleAddVisitor}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Visitor full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
                type="tel"
                pattern="[0-9]{10,15}"
                title="Enter 10 to 15 digits"
                required
              />
            </div>

            <div className="form-group">
              <label>Organization</label>
              <input
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                placeholder="Company or organization"
              />
            </div>

            <div className="form-group">
              <label>Purpose of Visit *</label>
              <input
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                placeholder="Purpose of visit"
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Person to Meet *</label>
              <input
                name="personToMeet"
                value={formData.personToMeet}
                onChange={handleInputChange}
                placeholder="Name of host/person to meet"
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button type="submit" className="primary-btn">
              Register Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VisitorForm;
import React, { useState, useContext } from 'react';
import { MyContext } from './MyProvider';
import "./contribute.css"

function PostForm() {

  const [postType, setPostType] = useState('');
  const [ageRestriction, setAgeRestriction] = useState('allAges');

  const [showInput, setShowInput] = useState(false);

  const { user } = useContext(MyContext);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState('');
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [tickets, setTickets] = useState("");
  const [price, setPrice] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [collaborators, setCollaborators] = useState("");


  const handleThumbnailUpload = (event) => {
    event.preventDefault();
    setShowInput(true);
  };

  const handleCollaboratorChange = (index, value) => {
    const updatedCollaborators = [...collaborators];
    updatedCollaborators[index] = value;
    setCollaborators(updatedCollaborators);
  };

    
      const handleAgeRestrictionChange = (event) => {
        setAgeRestriction(event.target.value);
        setAge(event.target.value);
      };

  const handlePostTypeChange = (e) => {
    setPostType(e.target.value);
  };

  const renderForm = () => {
    switch (postType) {
      case 'event':
        return renderEventForm();
      case 'blog':
        return renderBlogForm();
      case 'gig':
        return renderGigForm();
      default:
        return null;
    }
  };

  const renderEventForm = () => {

    function handleEventSubmit(e) {
      e.preventDefault();
    
      const newEvent = {
        host_id: user.id,
        title: title,
        street: street,
        city: city,
        state: state,
        zip: zip,
        neighborhood: neighborhood,
        venue: venue,
        date: date,
        start_time: startTime,
        end_time: endTime,
        tickets: tickets,
        price: price,
        thumbnail: thumbnail,
        age: age,
        category: category,
        subcategory: subcategory,
        description: description,
        collaborator_ids: collaborators,
      };

      console.log('New Event:', newEvent);
    
      fetch('/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server
          console.log('Event submitted:', data);
          // Perform any necessary actions after successful submission
          // For example, display a success message or redirect the user
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle the error if the submission fails
        });
    }
  

    return (
      <form 
      onSubmit={handleEventSubmit} 
      className="formWrapper">
      <div className="formContainer">
      <div className="formContainersWrapper">
      <div className="leftContainer">
        <h1 className="formType">
          EVENTS
        </h1>
      </div>
      <div className="rightContainer">
          <h1 className="formTitle"> give us the scoop...</h1>
          <div className="set">
            <div className="formTitleBox">
              <label className="postFormLabel" htmlFor="events-name">Title</label>
              <input
              className="postFormInput"
                type="text"
                id="postTitle"
                placeholder="Name your event"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="thumbnail">
              <button className="thumbnailUpload" onClick={handleThumbnailUpload}>
               +
              </button>
              <label 
              className="postFormLabel"
              id="thumbnailPrompt"
              > Upload a thumbnail for your event. <span className="postFormDisclaimer">Please follow community guidelines.</span></label>
             {showInput && ( <input
              className="postFormInput"
              type="text"
              id="thumbnailInput"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            /> )}
            </div>
            <div className="eventThumbnailDisplay">
            {thumbnail && <img className="chosenThumbnail" src={thumbnail} alt="Thumbnail" />}
            </div>
          </div>
          <div className="set">
            <div className="formTime">
              <label className="postFormLabel">Time</label>
              <input
                className="postFormInput"
                type="time"
                id="eventTime"
                placeholder="Start time"
                onChange={(e) => setStartTime(e.target.value)}
              />
              <input
                className="postFormInput"
                type="time"
                id="eventTime"
                placeholder="End time"
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className="formDate">
              <label className="postFormLabel">Date</label>
              <input
                className="postFormInput"
                type="date"
                id="eventDate"
                placeholder="MM/DD/YYYY"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="formCategoryBox">
              <label htmlFor="category">File Under:</label>
              <select className="eventFormSelectCategory" name="category"
              placeholder="Category"
              defaultValue=""
              onChange={(e) => setCategory(e.target.value)}>
              <option value="" className="categoryOption" disabled>Select a category</option>
              <option className="categoryOption" value="Music">Music</option>
              <option className="categoryOption"
              value="DJ">DJs</option>
              <option className="categoryOption"
              value="Photography">Photography</option>
              <option className="categoryOption"
              value="Fashion & Textiles">Fashion</option>
              <option className="categoryOption"
              value="Theater">Theater</option>
              <option className="categoryOption"
              value="Visual Arts">Visual Arts</option>
              <option value="Film">Film</option>
              <option value="Comedy">Comedy</option>
              </select>
              <input
                className="postFormInput"
                type="text"
                id="subcategory"
                placeholder="Subcategories"
                onChange={(e) => setSubcategory(e.target.value)}
              />
            </div>
          </div>
          <div className="set">
            <div className="formLocationBox">
              <label htmlFor="location">Location</label>
              <input
                className="postFormInput"
                type="text"
                id="state"
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
              />
              <input
                className="postFormInput"
                type="text"
                id="city"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                className="postFormInput"
                type="text"
                id="street"
                placeholder="Street"
                onChange={(e) => setStreet(e.target.value)}
              />
              <input
                className="postFormInput"
                type="text"
                id="zip"
                placeholder="ZIP"
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div className="formVenue">
              <label className="postFormLabel">Venue</label>
              <input
                className="postFormInput"
                type="text"
                id="eventVenue"
                placeholder="Venue name"
                onChange={(e) => setVenue(e.target.value)}
              />
              <input
                className="postFormInput"
                type="text"
                id="eventNeighborhood"
                placeholder="Neighborhood"
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </div>
            <div className="formCollaborators">
            <label className="eventFormLabel"> Collaborators? Give 'em a shout
           <input 
           className="eventFormInput" 
           type="text" name="collaborator1" 
           onChange={(e) => handleCollaboratorChange(0, e.target.value)}/>
            <input 
            className="eventFormInput" 
            type="text" name="collaborator2" 
            onChange={(e) => handleCollaboratorChange(1, e.target.value)}/>
           <input className="eventFormInput" 
           type="text" 
           name="collaborator3" 
           onChange={(e) => handleCollaboratorChange(2, e.target.value)}/>
         </label>
            </div>
          </div>
          <div className="set">
            <div className="formDescription">
              <label htmlFor="description">Description</label>
            <textarea 
            className="eventFormDescriptionBox" 
            name="description" 
            onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
          </div>
          <div className="set">
          <div className="formRestrictions">
            <label htmlFor="ageRestrictions">Age Restrictions?</label>
            <div className="radio-container">
              <input 
                className="postFormInput"
                type="radio"
                id="allAges"
                name="allAges"
                value="allAges"
                checked={ageRestriction === 'allAges'}
            onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="allAges">All Ages</label>
              <input
                className="postFormInput"
                type="radio"
                id="18"
                name="18"
                value="18"
                checked={ageRestriction === '18'}
              onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="18">18+</label>
              <input
                className="postFormInput"
                type="radio"
                id="21"
                name="21"
                value="21"
                checked={ageRestriction === '21'}
              onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="21">21+</label>
            </div>
          </div>
          </div>
          <div className="set">
            <div className="formTickets">
              <label htmlFor="tickets">Link to Tickets:</label>
              <input
                className="postFormInput"
                type="text"
                id="eventTickets"
                placeholder="Ticket Link"
                onChange={(e) => setTickets(e.target.value)}
              />
            </div>
          </div>
        <footer>
          <div className="submit">
            <button type="submit" className="postSubmitButton">Submit</button>
          </div>
        </footer>
      </div>
      </div>
    </div>
    </form>
    );
  };

  const renderBlogForm = () => {
    return (
      <div className="blogFormWrapper">
      <div className="formContainer">
      <div className="formContainersWrapper">
      <div className="leftContainer">
        <h1 className="formType">
          BLOG
        </h1>
      </div>
      <div className="rightContainer">
          <div className="set">
            <div className="formTitleBox">
              <label className="postFormLabel" htmlFor="pets-name">Title</label>
              <input
              className="postFormInput"
                type="text"
                id="postTitle"
                placeholder="Name your Post"
              />
            </div>
            <div className="formCategoryBox">
              <label htmlFor="category">File Under:</label>
              <select className="eventFormSelectCategory" name="category"
              placeholder="Category"
              defaultValue="">
              <option value="" className="categoryOption" disabled>Select a category</option>
              <option className="categoryOption" value="Music">Music</option>
              <option className="categoryOption"
              value="DJ">DJs</option>
              <option className="categoryOption"
              value="Photography">Photography</option>
              <option className="categoryOption"
              value="Fashion & Textiles">Fashion</option>
              <option className="categoryOption"
              value="Theater">Theater</option>
              <option className="categoryOption"
              value="Visual Arts">Visual Arts</option>
              <option value="Film">Film</option>
              <option value="Comedy">Comedy</option>
              </select>
              <input
                className="postFormInput"
                type="text"
                id="subcategory"
                placeholder="Subcategories"
              />
            </div>
          </div>
          <div className="set">
            <div className="formDescription">
              <label htmlFor="description">What's on your mind?</label>
            <textarea className="eventFormDescriptionBox" name="description"></textarea>
            </div>
          </div>
        <footer>
          <div className="submit">
            <button className="postSubmitButton">Submit</button>
          </div>
        </footer>
      </div>
      </div>
    </div>
    </div>
    );
  };

  const renderGigForm = () => {
    return (
      <div className="gigFormWrapper">
      <div className="formContainer">
      <div className="formContainersWrapper">
      <div className="leftContainer">
        <h1 className="formType">
          GIGS
        </h1>
      </div>
      <div className="rightContainer">
          <h1 className="formTitle"> give us the scoop...</h1>
          <div className="set">
            <div className="formTitleBox">
              <label className="postFormLabel" htmlFor="pets-name">Title</label>
              <input
              className="postFormInput"
                type="text"
                id="postTitle"
                placeholder="Name your ad"
              />
            </div>
          </div>
          <div className="set">
            <div className="formTime">
              <label className="postFormLabel">Time</label>
              <input
                className="postFormInput"
                type="text"
                id="eventTime"
                placeholder="Time"
              />
            </div>
            <div className="formDate">
              <label className="postFormLabel">Date</label>
              <input
                className="postFormInput"
                type="text"
                id="eventDate"
                placeholder="MM/DD/YYYY"
              />
            </div>
            <div className="formCategoryBox">
              <label htmlFor="category">File Under:</label>
              <select className="eventFormSelectCategory" name="category"
              placeholder="Category"
              defaultValue="">
              <option value="" className="categoryOption" disabled>Select a category</option>
              <option className="categoryOption" value="Music">Music</option>
              <option className="categoryOption"
              value="DJ">DJs</option>
              <option className="categoryOption"
              value="Photography">Photography</option>
              <option className="categoryOption"
              value="Fashion & Textiles">Fashion</option>
              <option className="categoryOption"
              value="Theater">Theater</option>
              <option className="categoryOption"
              value="Visual Arts">Visual Arts</option>
              <option value="Film">Film</option>
              <option value="Comedy">Comedy</option>
              </select>
              <input
                className="postFormInput"
                type="text"
                id="subcategory"
                placeholder="Subcategories"
              />
            </div>
          </div>
          <div className="set">
            <div className="formLocationBox">
              <label htmlFor="location">Location</label>
              <input
                className="postFormInput"
                type="text"
                id="state"
                placeholder="State"
              />
              <input
                className="postFormInput"
                type="text"
                id="city"
                placeholder="City"
              />
            </div>
            <div className="formVenue">
              <label className="postFormLabel">Role</label>
              <input
                className="postFormInput"
                type="text"
                id="eventVenue"
                placeholder="Role title"
              />
            </div>
            <div className="formCompensation">
              <label className="postFormLabel">Compensation</label>
              <input
                className="postFormInput"
                type="text"
                id="gigPay"
                placeholder="Gig Compensation"
              />
            </div>
          </div>
          <div className="set">
            <div className="formDescription">
              <label htmlFor="description">Details</label>
            <textarea className="eventFormDescriptionBox" name="description"></textarea>
            </div>
          </div>
          <div className="set">
            <div className="formDescription">
              <label htmlFor="description">Requirements</label>
            <textarea className="gigFormDescriptionBox" name="description"></textarea>
            </div>
          </div>
          <div className="set">
          <div className="formRestrictions">
            <label htmlFor="ageRestrictions">Duration</label>
            <div className="radio-container">
              <input 
                className="postFormInput"
                type="radio"
                id="allAges"
                name="allAges"
                value="allAges"
                checked={ageRestriction === 'allAges'}
            onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="allAges">One-Time</label>
              <input
                className="postFormInput"
                type="radio"
                id="18"
                name="18"
                value="18"
                checked={ageRestriction === '18'}
              onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="18">Temporary</label>
              <input
                className="postFormInput"
                type="radio"
                id="21"
                name="21"
                value="21"
                checked={ageRestriction === '21'}
              onChange={handleAgeRestrictionChange}
              />
              <label htmlFor="21">Permanent</label>
            </div>
          </div>
          </div>
        <footer>
          <div className="submit">
            <button className="postSubmitButton">Submit</button>
          </div>
        </footer>
      </div>
      </div>
    </div>
    </div>
    );
  };

  return (
    <div>
      <h1 className="postTypeHeader"> WHAT YOU GOT GOING ON?</h1>
      <label>
        Select post type:
        <select className="postTypeSelect" value={postType} onChange={handlePostTypeChange}>
          <option value="">Select</option>
          <option value="event">Event</option>
          <option value="blog">Blog</option>
          <option value="gig">Gig</option>
        </select>
      </label>

      {renderForm()}
    </div>
  );
}

export default PostForm;



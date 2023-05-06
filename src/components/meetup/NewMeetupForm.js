import { useRef } from "react";
import Card from "../ui/Card"
import classes from "./NewMeetupForm.module.css";

function NewMeetupForm(props) {

    const titleRef = useRef();
    const imageRef = useRef();
    const addressRef = useRef();
    const descRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        const meetup = {
            title: titleRef.current.value,
            image: imageRef.current.value,
            address: addressRef.current.value,
            description: descRef.current.value,
            isFav : true
        };
        console.log(meetup);

        props.onAddMeetup(meetup);
    }

    return (
        <Card>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label htmlFor="">Title</label>
                    <input type="text" required id="title" ref={titleRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="">Image</label>
                    <input type="text" required id="image" ref={imageRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="">Address</label>
                    <input type="text" required id="address" ref={addressRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="">Description</label>
                    <textarea required id="description" rows="5" ref={descRef} />
                </div>
                <div className={classes.actions}>
                    <button>Add Meetup</button>
                </div>               
            </form>
        </Card>
    );
}

export default NewMeetupForm;
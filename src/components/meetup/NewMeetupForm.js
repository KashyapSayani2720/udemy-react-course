import { useEffect, useRef } from "react";
import Card from "../ui/Card"
import classes from "./NewMeetupForm.module.css";

function NewMeetupForm(props) {

    const { onAddMeetup, onUpdateMeetup, meetup } = props;

    const titleRef = useRef();
    const imageRef = useRef();
    const addressRef = useRef();
    const descRef = useRef();

    async function handleSubmit(event) {
        event.preventDefault();
        const meetupData = {
            title: titleRef.current.value,
            image: imageRef.current.value,
            address: addressRef.current.value,
            description: descRef.current.value,
            isFav : false
        };

        if(meetup){
            meetupData.id = meetup.id;
            await onUpdateMeetup(meetupData);
        }
        else{
            await onAddMeetup(meetupData);
        }
    }

    useEffect(() => {
        if (meetup) {
            titleRef.current.value = meetup.title;
            imageRef.current.value = meetup.image;
            addressRef.current.value = meetup.address;
            descRef.current.value = meetup.description;
        }
    }, [meetup]);

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
                <button>{meetup ? 'Update Meetup' : 'Add Meetup'}</button>
                </div>               
            </form>
        </Card>
    );
}

export default NewMeetupForm;
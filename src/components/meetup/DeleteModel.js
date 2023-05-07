


function DeleteModel() {
    return (
        <div className={classes.modal}>
            <div className={classes.modal__content}>
                <div className={classes.modal__title}>
                    Are you sure you want to delete this meetup?
                </div>
                <div className={classes.modal__buttons}>
                    <button
                        className={`${classes.modal__button} ${classes['modal__button--confirm']}`}
                        onClick={handleConfirmDelete}
                    >
                        Yes
                    </button>
                    <button
                        className={`${classes.modal__button} ${classes['modal__button--cancel']}`}
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}


const validations = (newDog) => {
    const errors = {};

    if (!newDog.name) {
        errors.name = "Please enter a name"
    } else if (newDog.name.length > 20) {
        errors.name = "The name must be less than 20 characters"
    }

    if (!newDog.imageUrl) {
        errors.imageUrl = "Please enter an image URL"
    }

    if (!isNaN(newDog.min_height) && !isNaN(newDog.max_height)) {
        if (parseInt(newDog.min_height) >= parseInt(newDog.max_height)) {
            errors.height = "Minimum height should be less than maximum height";
        }
    } else {
        errors.height = "Please enter valid numbers for height";
    }

    // if (parseInt(newDog.min_weight) >= parseInt(newDog.max_weight)) {
    //     errors.weight = "Minimum weight should be less than maximum weight"
    // } else if (!newDog.min_weight && !newDog.max_weight) {
    //     errors.weight = "Please enter multiple values"
    // }

    if (!isNaN(newDog.min_weight) && !isNaN(newDog.max_weight)) {
        if (parseInt(newDog.min_weight) >= parseInt(newDog.max_weight)) {
            errors.weight = "Minimum weight should be less than maximum weight"
        }
    } else {
        errors.weight = "Please enter valid numbers for weight";
    }

    if (parseInt(newDog.life_spanMin) >= parseInt(newDog.life_spanMax)) {
        errors.life_span = "Minimum weight should be less than maximum weight"
    } else if (!newDog.life_spanMin && !newDog.life_spanMax) {
        errors.life_span = "Please enter multiple values"
    }

    if (newDog.temperaments.length === 0) {
        errors.temperaments = "Please enter at least one temperature"
    }

    return errors;
}

export default validations;
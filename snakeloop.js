import constants from "./constants"


const GameLoop = (entities, { touches, dispatch, events }) => {

    const head = entities.head
    const food = entities.food
    const tail = entities.tail

// {topRight:15, bottomRight:15, topLeft:15, bottomLeft:15}
    const getRandom = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }


    if (events.length) {
        for (let i = 0; i < events.length; i++)
            if (events[i].type === "move-up" && head.ySpeed !== 1) {
                head.ySpeed = -1;
                head.xSpeed = 0;
                head.radius = {topRight:15, bottomRight:0, topLeft:15, bottomLeft:0}
            } else if (events[i].type === "move-down" && head.ySpeed !== -1) {
                head.ySpeed = 1
                head.xSpeed = 0;
                head.radius = {topRight:0, bottomRight:15, topLeft:0, bottomLeft:15}
            } else if (events[i].type === "move-left" && head.xSpeed !== 1) {
                head.ySpeed = 0
                head.xSpeed = -1;
                head.radius = {topRight:0, bottomRight:0, topLeft:15, bottomLeft:15}
            } else if (events[i].type === "move-right" && head.xSpeed !== -1) {
                head.ySpeed = 0
                head.xSpeed = 1
                head.radius = {topRight:15, bottomRight:15, topLeft:0, bottomLeft:0}
            }
    }

    head.nextMove -= 1;
    if (head.position.x === food.position.x - 1 && head.position.y === food.position.y - 1 ||
        head.position.x === food.position.x - 1 && head.position.y === food.position.y + 1 ||
        head.position.x === food.position.x + 1 && head.position.y === food.position.y - 1 ||
        head.position.x === food.position.x + 1 && head.position.y === food.position.y + 1) {
        head.color = "purple"
    } else { head.color = "red" }
    if (head.nextMove == 0) {
        head.nextMove = head.updateFrequency;

        if (head.position.x + head.xSpeed < 0 ||
            head.position.x >= constants.grid_size - 1 ||
            head.position.y + head.ySpeed < 0 ||
            head.position.y + head.ySpeed >= constants.grid_size) {


            dispatch({ type: "game_over" })
        } else {

            tail.elements = [[head.position.x, head.position.y]].concat(tail.elements).slice(0, -1)
            head.position.x += head.xSpeed
            head.position.y += head.ySpeed

            for (let i = 0; i < tail.elements.length; i++) {
                if (head.position.y === tail.elements[i][0] && head.position.x === tail.elements[i][1]) {


                    dispatch({
                        type: "game_over"
                    })

                }
            }

            //getting collision
            if (head.position.x === food.position.x && head.position.y === food.position.y) {

                //growing the tale of snake:

                tail.elements = [[food.position.x, food.position.y]].concat(tail.elements)

                dispatch({
                    type: "point"
                })
                //new position for the food
                food.position.x = getRandom(1, constants.grid_size - 1);
                food.position.y = getRandom(1, constants.grid_size - 1);



            }
        }
    }


    return entities


}
export { GameLoop }
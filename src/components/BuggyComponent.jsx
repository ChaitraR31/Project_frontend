import React, { useState } from "react";

const BuggyComponent = () => {
    const [count, setCount] = useState(0);

    if (count > 3) {
        throw new Error("Something went wrong! Count exceeded 3.");
    }

    return (
        <div>
            <h2>Buggy Component</h2>
            <p>Click the button to increase count. It will crash after 3.</p>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increase</button>
        </div>
    );
};

export default BuggyComponent;

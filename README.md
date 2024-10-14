# ICBM Trajectory Simulation

This project is an interactive simulation of an Intercontinental Ballistic Missile (ICBM) launch and its inertial trajectory. The simulation models the physics of the missile's flight in a vacuum-like environment, including the effects of gravity, air drag (up to the edge of the atmosphere), and altitude-dependent air density.

## Key Features

- **Inertial Phase Simulation**: The missile is modeled after it reaches its initial velocity, with no active thrust. The simulation takes into account the effects of Earth's gravity and atmospheric drag during the missile's flight.
- **Realistic Earth Representation**: The Earth is accurately represented, including curvature, and the atmosphere's effects on drag and air density.
- **Air Density Simulation**: The air density decreases with altitude based on a scale height model.
- **Real-time Visualization**: The missile's trajectory is visualized in real time, along with the changing altitude and speed as it moves through different atmospheric layers.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dimitarbez/ICBMSimulator.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd ICBMSimulator
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the app in development mode:**
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in development mode. The page will automatically reload if you make edits, and you will also see any lint errors in the console.

#### `npm run build`

Builds the app for production. The build will be optimized for the best performance, including minified and hashed filenames for assets.

#### `npm test`

Launches the test runner in interactive watch mode.

## Simulation Details

### Physics Model
The simulation models the missile's motion under the following conditions:
- **Initial Velocity**: The missile is launched with an initial velocity set by the user.
- **Gravity**: The gravitational force acts on the missile, decreasing with altitude following the inverse-square law.
- **Air Drag**: The missile experiences air drag as it ascends, with air density decreasing exponentially with altitude.
- **No Thrust Phase**: After launch, the missile experiences no additional thrust, and its motion is purely inertial with gravity and drag forces acting on it.

### Constants Used
- **Earth's Radius**: `6,371,000 meters`
- **Earth's Mass**: `5.972 × 10^24 kg`
- **Gravitational Constant (G)**: `6.67430 × 10^-11 m³/kg/s²`
- **Atmospheric Scale Height**: `8,500 meters`
- **Sea Level Air Density**: `1.225 kg/m³`

### Adjusting the Simulation
- You can adjust the launch angle, initial velocity, and time scaling to observe different trajectories.
- The missile’s trajectory is visualized as it moves away from the Earth’s surface, and the effects of gravity and drag are visible as the trajectory curves.

## Using the Simulator

1. **Adjust Launch Parameters**: Use the control panel to set the launch angle (in degrees) and the initial velocity (in m/s).
2. **Start Simulation**: Click the "Start" button to launch the missile and view its trajectory.
3. **Pause and Reset**: You can pause the simulation or reset it to try different initial conditions.
4. **Visualization**: The missile’s current position is displayed, and its trajectory is drawn in real-time. The effects of drag and gravity are visualized as the missile ascends and curves along its trajectory.

## Learn More

To learn more about how missile trajectories are calculated, you can explore resources on:
- Orbital mechanics
- Atmospheric drag and air density models
- The physics of missile launches

## Contributing

If you'd like to contribute to the project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

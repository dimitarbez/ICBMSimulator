# 🚀 ICBM Trajectory Simulation
## https://icbmsimulator.com/

An interactive simulation of an Intercontinental Ballistic Missile (ICBM) launch, focusing on the missile’s inertial trajectory under the influence of **gravity**. This project offers a great foundation for building advanced missile simulations, and contributions are welcome to extend its features!

---

## ✨ Key Features

- **Inertial Phase Simulation**: The missile follows an inertial path after launch, with no active thrust. Gravity is the only force acting on the missile in this basic version of the simulation.
- **Realistic Earth Model**: The Earth is modeled accurately, including curvature and altitude-based gravitational forces.
- **Real-time Visualization**: The missile's flight path is visualized in real time, showing how gravity influences its trajectory.

---

## 🛠️ Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dimitarbez/ICBMSimulator.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd ICBMSimulator
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the app**:
   ```bash
   npm start
   ```
   The app will be running at [http://localhost:3000](http://localhost:3000).

---

## 📜 Available Scripts

Within the project directory, you can run:

#### `npm start`
Runs the app in development mode with hot reloading. Lint errors and warnings will appear in the console.

#### `npm run build`
Builds the app for production. The production build will be optimized for the best performance.

#### `npm test`
Launches the test runner in interactive watch mode.

---

## 🔬 Simulation Details

### Physics Model

The current simulation models the missile's motion using:

- **Initial Velocity**: The missile is launched with a user-defined velocity.
- **Gravity**: Gravity is the only force acting on the missile, decreasing with altitude according to the inverse-square law.
- **No Thrust Phase**: After launch, the missile follows a purely inertial trajectory.

### Constants Used

- **Earth's Radius**: `6,371,000 meters`
- **Earth's Mass**: `5.972 × 10^24 kg`
- **Gravitational Constant (G)**: `6.67430 × 10^-11 m³/kg/s²`

---

## 🚀 Using the Simulator

1. **Adjust Launch Parameters**: Use the control panel to set the launch angle (in degrees) and initial velocity (in m/s).
2. **Start Simulation**: Click the "Start" button to launch the missile and visualize the trajectory.
3. **Pause/Reset**: You can pause the simulation or reset it to try different initial conditions.
4. **Visualization**: The missile’s current position is displayed, and its trajectory is drawn in real-time.

---

## 💡 Ways to Contribute

### 1. **Add Air Drag and Atmospheric Effects**
   - **Feature**: Implement air drag to simulate how air resistance slows the missile down as it passes through the atmosphere.
   - **Improvement**: Introduce altitude-dependent air density using the barometric formula to make drag realistic at different altitudes:
     ```
     rho(h) = rho_0 * e^(-h / H)
     ```
     where:
     - `rho_0` is sea-level air density (1.225 kg/m³).
     - `h` is the altitude.
     - `H` is the scale height (about 8,500 meters).

### 2. **Model Wind Effects**
   - **Feature**: Add wind dynamics to simulate lateral forces on the missile.
   - **Improvement**: You can create a wind model that varies with altitude and direction, adding complexity to the missile’s flight path.

### 3. **Implement a Staging System**
   - **Feature**: Many ICBMs have multiple stages. You could implement a system where different stages are jettisoned, reducing the missile's mass and adjusting its velocity accordingly.
   - **Improvement**: Allow the missile to change thrust or lose weight dynamically during flight.

### 4. **Thrust and Boost Phases**
   - **Feature**: Add a thrust phase before the inertial phase to simulate missile engines providing an initial boost.
   - **Improvement**: Use realistic thrust forces and durations for the boost phase before the missile switches to inertial motion.

### 5. **Collision Detection and Impact Simulation**
   - **Feature**: Detect when the missile impacts the ground or reaches a target, and simulate the effect of the impact.
   - **Improvement**: Introduce an "explosion" or event-trigger when the missile reaches its destination.

### 6. **Advanced Visualization**
   - **Feature**: Improve the visualization of the missile's path, adding 3D effects or better indicators of altitude, velocity, and acceleration.
   - **Improvement**: Use WebGL or other libraries to create advanced 3D visualizations of the Earth's curvature and the missile's trajectory.

### 7. **Advanced Physics Models**
   - **Feature**: Incorporate more advanced physics models such as the Coriolis effect, which impacts long-range trajectories.
   - **Improvement**: Include atmospheric scattering, heat generation during reentry, or other effects that enhance the realism of the simulation.

---

## 💻 Learn More

To better understand the physics involved in missile flight, consider exploring the following topics:

- Orbital mechanics and the physics of space travel
- Air density models and drag force calculations
- The physics behind real-world missile launches and their trajectories

---

## 🤝 Contributing

Contributions are warmly welcomed! If you’re interested in adding features, fixing bugs, or improving the simulation, feel free to:

1. **Fork the repository**.
2. **Create a feature branch**: `git checkout -b feature/my-feature`.
3. **Commit your changes**: `git commit -m 'Add a cool feature'`.
4. **Push to the branch**: `git push origin feature/my-feature`.
5. **Open a Pull Request**.

Your contributions will help improve this project for everyone!

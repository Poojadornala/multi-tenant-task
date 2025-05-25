router.post("/register", async (req, res) => {
  try {
    const { name, email, password, organizationName } = req.body;
    console.log("Register request received:", name, email);

    if (!name || !email || !password || !organizationName) {
      console.log("Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "User already exists" });
    }

    // Create organization
    const organization = new Organization({ name: organizationName });
    await organization.save();
    console.log("Organization created:", organization._id);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      organization: organization._id,
      role: "Admin", // or "Manager"/"Member"
    });

    await user.save();
    console.log("User registered:", user._id);

    const token = jwt.sign(
      { id: user._id, organizationId: user.organization, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

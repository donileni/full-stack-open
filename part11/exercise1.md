Language: Python

Tools for CI Steps
Linting: There are many options for linting when it comes to Python. Some prominent examples include Pylint, Flake8, Pyflakes, and Pycodestyle.
Testing: There are also many tools for testing. Examples include Pytest, Unittest, and Nose2.
Building: Examples of tools for the building step in CI include Hatch, Poetry, and PyBuilder.

CI Tools
Here are a few examples of standard CI tools for Python: GitLab CI, Travis CI, CircleCI, and Semaphore.

Self-Hosted vs. Cloud-Based
The decision to choose between a self-hosted and a cloud-based environment would depend on multiple variables:

Project Size:. For larger projects, a self-hosted solution may be preferable; meanwhile, cloud-based solutions are typically better suited for smaller projects.
Flexibility: If you require high flexibility in your CI setup, consider a self-hosted solution.
Technical Expertise: If you have limited experience with CI, it may be a better option to opt for a cloud-based solution, which is easier to set up.
Security: With a self-hosted solution, you get better security, as you control all resources, including secrets, etc.

In our hypothetical scenario, I would rather go for a cloud-based solution like GitHub Actions. The reason for this is that we are a small team of only six people, which indicates that the project is relatively small. However, to make a definitive decision, I would need more information.

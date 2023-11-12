const About = () => (
  <>
    <section>
      <h2>About the project</h2>
      <p>
        Drive Safe emerged as an initiative during INRIX Hack 2023 with the
        primary objective of creating a user-friendly platform to generate safe
        and easy to follow driving practice routes. Many individuals in the
        United States, especially those preparing for their very first
        behind-the-wheel DMV driving exams, often encounter challenges in
        identifying a secure route for improving their driving skills. The core
        purpose of this project is to address this gap and provide an accessible
        solution for learners to practice effectively and with confidence.
      </p>
    </section>
    <section>
      <h2>About</h2>
      <p>
        Drive Safe is a cutting-edge application that leverages the capabilities
        of INRIX and Google APIs to generate a secure driving route within a
        specified area, taking into account various user-defined parameters. The
        safety of these routes is assessed through the consideration of factors
        such as average speed, the number of freeways, frequency of turns and
        intersections, abrupt speed changes, road straightness, and more.
      </p>
      <p>
        Our algorithm assigns danger points to each route based on these
        criteria, allowing users to make informed decisions about their practice
        routes. Following the evaluation, the application filters and
        prioritizes routes, ensuring that the generated options are not only
        suitable for practice but also prioritize safety.
      </p>
      <p>
        Once the safety assessment is complete, the application integrates with
        Google Maps, providing users with the most appropriate and secure
        driving route. This route is then readily available for transfer to
        navigation apps, streamlining the learning process and empowering users
        with a reliable tool for refining their driving skills confidently and
        safely.
      </p>
    </section>
  </>
);

export default About;

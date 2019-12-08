/**
 * This is the entry point to the program
 *
 * @param {any} input Array of student objects
 */
function classifier(input) {
  if (!Array.isArray(input)) {
    throw new TypeError(
      `Expected input to be Array instead got ${typeof input}`,
    );
  }

  if (input.length === 0) {
    return { noOfGroups: 0 };
  }

  const clone = input.map(student => {
    const age = calculateAge(student.dob);

    return { age, ...student };
  });

  clone.sort((first, second) => first.age - second.age);

  const output = clone.reduce(
    (groups, student) => {
      const currentIndex = groups.noOfGroups;
      const nextIndex = groups.noOfGroups + 1;
      const currentGroupName = `group${currentIndex}`;
      const nextGroupName = `group${nextIndex}`;
      const currentGroup = groups[currentGroupName] || { members: [], sum: 0 };

      const isOlder = currentGroup.members.some(
        occupant => student.age - occupant.age > 5,
      );

      if (!isOlder && currentGroup.members.length !== 3) {
        return; // Complete this
      }

      return {
        ...groups,
        [nextGroupName]: {
          members: [student],
          oldest: student.age,
          sum: student.age,
          regNos: [parseInt(student.regNo, 10)],
        },
        noOfGroups: nextIndex,
      };
    },
    { noOfGroups: 1 },
  );

  return output;
}

/**
 * Calculates the age given their date of birth
 * Uses the difference between the current year and the year of the dob specified
 *
 * @param {string | number | Date} dob The date of birth to calculate
 * @returns {number} The age
 */
function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);

  return today.getFullYear() - birthDate.getFullYear();
}

module.exports = classifier;

// Edit each work in this list.
// Change title, description, medium, dimensions, date, collaborators, and venue.
// Leave a field as "" to hide that credit on the page.
// Dates below come from the photo filenames. Change them if the work was made earlier.
// Mediums are guesses from the photos. Confirm each one.

const works = [
  {
    title: "Untitled (wire structure)",
    src: "images/20230926_135728.jpg",
    alt: "Sculpture of small cubes painted black, red, and blue, joined by thin wires into an open arched structure on a wood floor.",
    description:
      "Small painted blocks held apart by wire, readable as both a body and a diagram of connection.",
    medium: "Wood, wire, and acrylic",
    dimensions: "[add dimensions]",
    date: "2023",
    collaborators: "None",
    venue: "[add venue, if relevant]",
  },
  {
    title: "Untitled (divided face)",
    src: "images/Screenshot_20231031_185425_Instagram.jpg",
    alt: "Drawing of a person in profile whose face is split between living features and a skull, with orange, red, and yellow spirals leaving the mouth.",
    description:
      "A profile holds a living eye and a skull in one outline. Color leaves the mouth in a spiral.",
    medium: "Ink and marker on paper",
    dimensions: "[add dimensions]",
    date: "2023",
    collaborators: "None",
    venue: "[add venue, if relevant]",
  },
  {
    title: "Untitled (waveform)",
    src: "images/unnamed.jpg",
    alt: "High-contrast image of a handgun aimed at a head that breaks into bright shards, with vertical bars like a sound wave to the left.",
    description:
      "A head comes apart at the point of impact, and the break continues left as a waveform.",
    medium: "Digital image",
    dimensions: "[add dimensions]",
    date: "[add date]",
    collaborators: "None",
    venue: "[add venue, if relevant]",
  },
  {
    title: "In His Image, Regardless",
    src: "images/20240426_110619.jpg",
    alt: "Dark metal sculpture with broken mirror pieces set in the center, photographed above the handwritten title In His Image, Regardless.",
    description:
      "A rough metal frame holds a mirror that has been cut, so a reflection comes back in pieces. The handwritten title is part of the work.",
    medium: "Mixed media sculpture with mirror",
    dimensions: "[add dimensions]",
    date: "2024",
    collaborators: "None",
    venue: "[add venue, if relevant]",
  },
];

const creditFields = [
  ["medium", "Medium"],
  ["dimensions", "Dimensions"],
  ["date", "Date"],
  ["collaborators", "Collaborators"],
  ["venue", "Installation venue"],
];

const gallery = document.getElementById("gallery");
const year = document.getElementById("year");
const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewer-image");
const viewerCopy = document.getElementById("viewer-copy");
const viewerClose = document.getElementById("viewer-close");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

function isPlaceholder(value) {
  return value.trim().startsWith("[");
}

function fillCredits(list, work) {
  creditFields.forEach(([key, label]) => {
    const value = work[key];
    if (!value) {
      return;
    }

    const row = document.createElement("div");
    const term = document.createElement("dt");
    term.textContent = label;

    const detail = document.createElement("dd");
    detail.textContent = value;
    if (isPlaceholder(value)) {
      detail.className = "is-placeholder";
    }

    row.append(term, detail);
    list.append(row);
  });
}

function fillCopy(container, work, headingTag) {
  const heading = document.createElement(headingTag);
  heading.textContent = work.title;
  if (headingTag === "h2") {
    heading.id = "viewer-title";
  }

  const description = document.createElement("p");
  description.className = "piece-description";
  description.textContent = work.description;
  if (isPlaceholder(work.description)) {
    description.classList.add("is-placeholder");
  }

  const credits = document.createElement("dl");
  credits.className = "credits";
  fillCredits(credits, work);

  container.replaceChildren(heading, description, credits);
}

function openViewer(work) {
  if (!viewer || !viewerImage || !viewerCopy) {
    return;
  }

  viewerImage.src = work.src;
  viewerImage.alt = work.alt;
  fillCopy(viewerCopy, work, "h2");
  viewer.showModal();
}

if (gallery) {
  const fragment = document.createDocumentFragment();

  works.forEach((work, index) => {
    const figure = document.createElement("figure");
    figure.className = "piece";
    figure.style.animationDelay = `${index * 0.08}s`;

    const frame = document.createElement("div");
    frame.className = "piece-frame";

    const image = document.createElement("img");
    image.src = work.src;
    image.alt = work.alt;
    image.loading = "lazy";

    const open = document.createElement("button");
    open.type = "button";
    open.className = "piece-open";
    open.setAttribute("aria-label", `View ${work.title} larger`);
    open.append(image);
    open.addEventListener("click", () => openViewer(work));

    frame.append(open);

    const caption = document.createElement("figcaption");
    caption.className = "piece-copy";
    fillCopy(caption, work, "h3");

    figure.append(frame, caption);
    fragment.append(figure);
  });

  gallery.append(fragment);

  const pieces = gallery.querySelectorAll(".piece");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  pieces.forEach((piece) => observer.observe(piece));
}

if (viewerClose && viewer) {
  viewerClose.addEventListener("click", () => viewer.close());
}

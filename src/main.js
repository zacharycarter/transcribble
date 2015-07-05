$(function() {
  var canvas = $("#score")[0];
  var renderer = new Vex.Flow.Renderer(canvas,
    Vex.Flow.Renderer.Backends.CANVAS);

  var ctx = renderer.getContext();
  var stave = new Vex.Flow.Stave(0, 0, 500);

  // Add a treble clef
  stave.addClef("treble");
  stave.setContext(ctx).draw();

  // Create a quarter E, a half D, and a quarter C-Major chord.
  var notes = [
    new Vex.Flow.StaveNote({ keys: ["e/5"], duration: "q" }),
    new Vex.Flow.StaveNote({ keys: ["d/5"], duration: "h" }),
    new Vex.Flow.StaveNote({ keys: ["c/5", "e/5", "g/5"], duration: "q" })
  ];

  // Create a second voice, with just one whole note
  var notes2 = [
    new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "w" })
  ];

  // Create a voice in 4/4
  function create_4_4_voice() {
    return new Vex.Flow.Voice({
      num_beats: 4,
      beat_value: 4,
      resolution: Vex.Flow.RESOLUTION
    });
  }

  // Create voices and add notes to each of them.
  var voice = create_4_4_voice().addTickables(notes);
  var voice2 = create_4_4_voice().addTickables(notes2);

  // Format and justify the notes to 500 pixels
  var formatter = new Vex.Flow.Formatter().
    joinVoices([voice, voice2]).format([voice, voice2], 500);

  // Render voice
  voice.draw(ctx, stave);
  voice2.draw(ctx, stave);
});
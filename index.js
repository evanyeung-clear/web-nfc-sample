scanButton.addEventListener("click", async () => {
    log("User clicked scan button");
  
    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      log("> Scan started");
  
      ndef.addEventListener("readingerror", () => {
        log("Argh! Cannot read data from the NFC tag. Try another one?");
      });
  
      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        log(`> Serial Number: ${serialNumber}`);
        log(`> Records: (${message.records.length})`);
        for (const record of message.records) {
          log(`> Record type: ${record.recordType}`);
          log(`> Media type: ${record.mediaType}`);
          log(`> Id: ${record.id}`);
          log(`> Data: ${record.data}`);
          log(`> Encodig: ${record.encoding}`);
          log(`> Lang: ${record.lang}`);

          if (record.recordType === "text") {
            const decoder = new TextDecoder(record.encoding);
            text = decoder.decode(record.data);
            log(`> Data: (${text})`);
          } else if (record.recordType === ":act") {
            action = record.data.getUint8(0);
          }
        };
      });
    } catch (error) {
      log("Argh! " + error);
    }
  });
  
  writeButton.addEventListener("click", async () => {
    log("User clicked write button");
  
    // try {
    //   const ndef = new NDEFReader();
    //   await ndef.write("Hello world!");
    //   log("> Message written");
    // } catch (error) {
    //   log("Argh! " + error);
    // }
  });
  
  makeReadOnlyButton.addEventListener("click", async () => {
    log("User clicked make read-only button");
  
    // try {
    //   const ndef = new NDEFReader();
    //   await ndef.makeReadOnly();
    //   log("> NFC tag has been made permanently read-only");
    // } catch (error) {
    //   log("Argh! " + error);
    // }
  });
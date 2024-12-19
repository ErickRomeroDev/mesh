import { CardanoSDKSerializer } from "@meshsdk/core-cst";

describe("Serialization utils", () => {
  const serializer = new CardanoSDKSerializer();

  it("serialize reward address", () => {
    expect(
      serializer.serializeRewardAddress(
        "e0464447c1f51adaefe1ebfb0dd485a349a70479ced1d198cbdf7fe7",
        false,
        0,
      ),
    ).toEqual(
      "stake_test1ursyv3z8c8634kh0u84lkrw5sk35nfcy088dr5vce00hlec3nfuma",
    );
  });

  it("serialize pool id", () => {
    expect(
      serializer.serializePoolId(
        "aef9b993cb2fea46cac0b7fe4f98426392f851792b39206567566029",
      ),
    ).toEqual("pool14mumny7t9l4ydjkqkllylxzzvwf0s5te9vujqet82eszj3d6ccm");
  });

  it("serialize data", () => {
    expect(
      serializer.serializeData({
        content: {
          constructor: 0,
          fields: [
            {
              constructor: 2,
              fields: [
                {
                  constructor: 0,
                  fields: [
                    {
                      constructor: 1,
                      fields: [
                        {
                          bytes:
                            "1a4c95cd8c6fc37e83914a5286358d530f99123806aa2f2c4d2b1fb7",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              constructor: 2,
              fields: [
                {
                  constructor: 0,
                  fields: [
                    {
                      constructor: 1,
                      fields: [
                        {
                          bytes:
                            "213b5f66a7cbe034eeb26223940e256f9add1a526efc22be22517e39",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              constructor: 0,
              fields: [
                {
                  constructor: 0,
                  fields: [
                    {
                      map: [
                        {
                          k: {
                            bytes: "30",
                          },
                          v: {
                            constructor: 0,
                            fields: [
                              {
                                bytes:
                                  "70c9a227cb5b55a221cfaca128b038f6f10e78f2015698781a296d52",
                              },
                            ],
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  constructor: 0,
                  fields: [
                    {
                      constructor: 0,
                      fields: [
                        {
                          bytes:
                            "1c4ef054932bafcb4a59810f31fa0ed001d6611066938d1a1aef1d1237c0a441",
                        },
                      ],
                    },
                    {
                      int: 0,
                    },
                  ],
                },
                {
                  constructor: 0,
                  fields: [
                    {
                      constructor: 1,
                      fields: [
                        {
                          bytes:
                            "6f9114681e5690c9293ade8f4a0f2856ab43d8d1b3397d4e3ae6b2c3",
                        },
                      ],
                    },
                    {
                      constructor: 1,
                      fields: [],
                    },
                  ],
                },
                {
                  constructor: 0,
                  fields: [
                    {
                      bytes:
                        "1cf9e87a5325a3f10afe0083bc6161f9b42298cd781fbaeb5d92c698",
                    },
                    {
                      bytes: "",
                    },
                  ],
                },
                {
                  constructor: 0,
                  fields: [
                    {
                      bytes:
                        "5ec37726eebe67f1db9f84e739b24e9e4dbb4c632a36a50ce74bfc86",
                    },
                    {
                      bytes: "55534441",
                    },
                  ],
                },
                {
                  constructor: 0,
                  fields: [
                    {
                      constructor: 1,
                      fields: [
                        {
                          bytes:
                            "84bbee03e9403e186817e6b24790370a5ea4a63489753d94a7ff5866",
                        },
                      ],
                    },
                    {
                      constructor: 1,
                      fields: [],
                    },
                  ],
                },
                {
                  constructor: 0,
                  fields: [
                    {
                      constructor: 0,
                      fields: [
                        {
                          bytes:
                            "f95cab9352c14782a366802b7967746a89356e8915c17006149ff68c",
                        },
                      ],
                    },
                    {
                      constructor: 1,
                      fields: [],
                    },
                  ],
                },
                {
                  int: 1,
                },
                {
                  int: 1,
                },
              ],
            },
          ],
        },
        type: "JSON",
      }),
    ).toEqual(
      "d8799fd87b9fd8799fd87a9f581c1a4c95cd8c6fc37e83914a5286358d530f99123806aa2f2c4d2b1fb7ffffffd87b9fd8799fd87a9f581c213b5f66a7cbe034eeb26223940e256f9add1a526efc22be22517e39ffffffd8799fd8799fa14130d8799f581c70c9a227cb5b55a221cfaca128b038f6f10e78f2015698781a296d52ffffd8799fd8799f58201c4ef054932bafcb4a59810f31fa0ed001d6611066938d1a1aef1d1237c0a441ff00ffd8799fd87a9f581c6f9114681e5690c9293ade8f4a0f2856ab43d8d1b3397d4e3ae6b2c3ffd87a80ffd8799f581c1cf9e87a5325a3f10afe0083bc6161f9b42298cd781fbaeb5d92c69840ffd8799f581c5ec37726eebe67f1db9f84e739b24e9e4dbb4c632a36a50ce74bfc864455534441ffd8799fd87a9f581c84bbee03e9403e186817e6b24790370a5ea4a63489753d94a7ff5866ffd87a80ffd8799fd8799f581cf95cab9352c14782a366802b7967746a89356e8915c17006149ff68cffd87a80ff0101ffff",
    );
  });
});

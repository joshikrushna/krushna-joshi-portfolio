actor {
  var visitorCount = 0;

  public shared ({ caller }) func incrementVisitorCount() : async Nat {
    visitorCount += 1;
    visitorCount;
  };

  public query ({ caller }) func getVisitorCount() : async Nat {
    visitorCount;
  };
};
